<template>
  <section class="section">
    <h1 class="title">New Stock Plate</h1>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">File</label>
      <div class="file">
        <label class="file-label">
          <input class="file-input" type="file" name="fileZ" id="file">
          <span class="file-cta">
      <span class="file-icon">
       <font-awesome-icon icon="upload"/>
      </span>
      <span class="file-label" id="file-label">
        Choose a file…
      </span>
    </span>
        </label>
      </div>
    </div>

    <hr/>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <nuxt-link to="/stocks" class="button is-text">
          Cancel
        </nuxt-link>
      </div>
    </div>

  </section>
</template>

<script>

  if (process.browser) {
    var file = document.getElementById("file");
    file.onchange = function () {
      if (file.files.length > 0) {
        document.getElementById('file-label').innerHTML = file.files[0].name;
      }
    };

  }

  export default {}
</script>
