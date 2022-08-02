<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ group.name }}</p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="row-wrapper">
          <div>
            <label class="label">Display Name</label>
            <div v-if="!isEditing">{{ group.name }}</div>
            <b-input
              v-else
              class="limitInputWidth"
              v-model="group.name"
            ></b-input>
          </div>
          <div>
            <label class="label">Group Leader username</label>
            <div v-if="!isEditing">{{ group.username }}</div>
            <b-input
              class="limitInputWidth"
              v-else
              v-model="group.username"
            ></b-input>
          </div>
        </div>
        <div>
          <label class="label">Research Assistant usernames</label>
          <b-taglist class="b-tags-wrapper">
            <div v-if="!isEditing">
              <b-tag
                v-for="(raUsername, index) in group.researchAssistants"
                :key="index"
                type="is-danger"
                attached
                :closable="isEditing"
                aria-close-label="Close tag"
                @close="handleRemoveRaUsername(index)"
              >
                {{ raUsername }}
              </b-tag>
            </div>
            <b-taginput
              v-else
              v-model="group.researchAssistants"
              ellipsis
              icon="label"
              placeholder="Type a tag then hit enter to add it"
              aria-close-label="Delete this tag"
            ></b-taginput>
          </b-taglist>
        </div>
        <div class="marginTop">
          <label class="label">LDAP Groups</label>
          <b-taglist class="b-tags-wrapper">
            <div v-if="!isEditing">
              <b-tag
                v-for="(raUsername, index) in group.acceptableLdapGroupStrs"
                :key="index"
                type="is-danger"
                class="full-width"
                attached
                :closable="isEditing"
                aria-close-label="Close tag"
                @close="handleRemoveLdapStr(index)"
              >
                {{ raUsername }}
              </b-tag>
            </div>
            <b-taginput
              v-else
              class="full-width"
              v-model="group.acceptableLdapGroupStrs"
              ellipsis
              icon="label"
              placeholder="Type a tag then hit enter to add it"
              aria-close-label="Delete this tag"
            ></b-taginput>
          </b-taglist>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a v-if="!isEditing" @click="enterEditMode" class="card-footer-item"
        >Edit</a
      >
      <!-- <div v-else-if="!isEditing && disableEdit" class="card-footer-item">
        [Cannot edit when editing another]
      </div> -->
      <a v-else @click="saveChanges" class="card-footer-item">Save</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'GroupCard',
  props: ['group', 'theIndex', 'disableEdit'],
  data() {
    return {
      isEditing: false,
      additionalRaUsernames: [],
      additionalLdapStrs: [],
      //editedGroup: JSON.parse(JSON.stringify(this.group)),
    };
  },
  methods: {
    enterEditMode() {
      this.isEditing = true;
    },
    saveChanges() {
      // call parent function in order to update props

      const editedGroup = JSON.parse(JSON.stringify(this.group));
      editedGroup.researchAssistants.concat(this.additionalRaUsernames);
      editedGroup.acceptableLdapGroupStrs.concat(this.additionalLdapStrs);

      this.additionalRaUsernames = [];
      this.additionalLdapStrs = [];

      this.$emit('saveChangesToGroup', this.theIndex, editedGroup);
      this.isEditing = false;
    },
    handleRemoveRaUsername(index) {
      this.group.researchAssistants.splice(index, 1);
    },
    handleRemoveLdapStr(index) {
      this.group.acceptableLdapGroupStrs.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.row-wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}

.row-wrapper > * {
  flex: 1;
}

.marginTop {
  margin-top: 1rem;
}

.limitInputWidth {
  max-width: 80%;
}

.b-tags-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  align-items: baseline;
}

.b-tags-wrapper > * {
  margin-right: 0.5rem;
}

.newLines {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  align-items: flex-start;
}

.newLines > * {
  margin-bottom: 0.5rem;
}
</style>
