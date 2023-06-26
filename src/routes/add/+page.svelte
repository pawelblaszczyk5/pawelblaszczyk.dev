<script lang="ts" strictEvents></script>

<form method="POST">
	<label>
		Username
		<input minLength={1} name="username" required type="text" />
	</label>
	<label>
		Text
		<input minLength={1} name="text" required type="text" />
	</label>
	<button type="submit">Submit</button>
</form>
