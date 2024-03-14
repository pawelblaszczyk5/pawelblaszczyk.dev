export const defer = () => {
	let resolve!: () => void;
	let reject!: (reason: unknown) => void;

	const promise = new Promise<void>((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});

	return { promise, reject, resolve };
};

export const removeByTagLuaScript = `
local root_key = KEYS[1]
local json_data = redis.call("JSON.GET", root_key)
local tag_to_remove = ARGV[1]

if json_data then
    local decoded_data = cjson.decode(json_data)

    for k, v in pairs(decoded_data or {}) do
        if v["tags"] then
            local should_keep = true
            for _, tag in ipairs(v["tags"]) do
                if tag == tag_to_remove then
                    should_keep = false
                    break
                end
            end
            if not should_keep then
                decoded_data[k] = nil
            end
        end
    end

    decoded_data["__meta__"] = {}

    redis.call("JSON.SET", root_key, "$", cjson.encode(decoded_data))
end
`;
