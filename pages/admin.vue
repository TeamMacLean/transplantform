<template>
  <div>
    <h1 class="title is-2">Edit database (Admin)</h1>

    <div v-if="!this.$auth.$state.user.isAdmin" class="title is-4">
      <p>You are not permitted to view this page.</p>
    </div>

    <div class="crudWrapper">
      <div class="container">
        <h3 class="title is-5">
          Please click a link to see database editing options
        </h3>
        <hr />
        <div class="my-nav-bar">
          <a
            v-for="(obj, index) in editItems"
            :key="'j' + index"
            :class="
              editItems[index].mongoName === activeTab
                ? 'nav-bar-item is-active'
                : 'nav-bar-item'
            "
            @click="setActiveTab(editItems[index].mongoName)"
          >
            {{ obj.name }}
          </a>
          <a
            @click="setActiveTab('ldapGroups')"
            :class="
              'ldapGroups' === activeTab
                ? 'nav-bar-item is-active'
                : 'nav-bar-item'
            "
          >
            LDAP Groups
          </a>
        </div>
        <div>
          <div
            v-for="(obj, index) in editItems"
            :key="'jj' + index"
            :label="obj.name"
            ref="inputs"
          >
            <div class="normal-field" v-if="activeTab === obj.mongoName">
              <label class="label">Active</label>
              <div v-if="obj.active && obj.active.length">
                <div
                  v-for="(activeItem, jIndex) in obj.active"
                  :key="'jjj' + jIndex"
                  class="margin-b-tag"
                >
                  <b-tag
                    size="is-medium"
                    :closable="
                      getIsClosable(obj.active, activeItem, obj.mongoName)
                    "
                    aria-close-label="Close tag"
                    @close="promptToArchive(index, jIndex, activeItem._id)"
                  >
                    {{ activeItem.name }}
                  </b-tag>
                </div>
              </div>
              <div v-else>
                <p class="pb-10">No active items.</p>
              </div>
              <div>
                <label>Add new:</label>
                <input v-model="obj.toAdd" />
                <b-button
                  :disabled="getDisabledAddNew(index)"
                  @click="submitAdditional(index)"
                  >Submit</b-button
                >
              </div>
              <br />
              <label class="label">Archived</label>
              <div v-if="obj.archived && obj.archived.length">
                <div
                  v-for="(archivedItem, kIndex) in obj.archived"
                  :key="'jjjj' + kIndex"
                  class="margin-b-tag"
                >
                  <b-tag
                    size="is-medium"
                    closable
                    attached
                    close-icon="upload"
                    aria-close-label="Close tag"
                    @close="promptToReactivate(index, kIndex, archivedItem._id)"
                  >
                    {{ archivedItem.name }}
                  </b-tag>
                </div>
              </div>
              <div v-else>
                <p>No archived items.</p>
              </div>
            </div>
          </div>
          <div
            label="LDAP groups"
            class="group-field"
            v-if="activeTab === 'ldapGroups'"
          >
            <h4 class="title is-6">
              <i>Please edit and save groups one at a time.</i>
            </h4>
            <GroupCard
              v-for="(group, lIndex) in ldapGroups"
              :key="'jjjjjjjjj' + lIndex"
              :theIndex="lIndex"
              :group="group"
              @saveChangesToGroup="updateLdapGroup"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupCard from '../components/GroupCard.vue';

const defaultDialogOptions = {
  confirmText: 'Approve',
  cancelText: 'Cancel',
  type: 'is-success',
  hasIcon: true,
  onCancel: () => {
    window.location.reload(true);
  },
};

export default {
  middleware: 'auth',
  components: {
    GroupCard,
  },

  asyncData({ $axios }) {
    return $axios
      .get('/api/admin')
      .then((res) => {
        const allSpecies = res.data.species;
        const allGenotypes = res.data.genotypes;
        const allVectorSelections = res.data.vectorSelections;
        const allTdnaSelections = res.data.tdnaSelections;
        const allAgroStrains = res.data.agroStrains;
        const allAdmins = res.data.admins;

        const allResults = [
          allSpecies,
          allGenotypes,
          allVectorSelections,
          allTdnaSelections,
          allAgroStrains,
          allAdmins,
        ];

        const mongoNames = [
          'Specie',
          'Genotype',
          'VectorSelection',
          'TdnaSelection',
          'AgroStrain',
          'Admin',
        ];

        const displayNames = [
          'Species',
          'Genotypes',
          'Vector selections',
          'T-DNA selections',
          'Agro Strains',
          'Admins',
        ];

        const editItems = mongoNames.map((mongoName, index) => ({
          mongoName,
          name: displayNames[index],
          active:
            allResults[index] &&
            allResults[index].length &&
            allResults[index].filter((item) => !item.archived),
          archived:
            allResults[index] &&
            allResults[index].length &&
            allResults[index].filter((item) => item.archived),
          toAdd: '',
        }));

        const ldapGroups = res.data.groups;

        return {
          ldapGroups: ldapGroups,
          editItems: editItems,
          activeTab: 'species',
        };
      })
      .catch((err) => {
        console.error(err);
        return {
          namedConstructs: null,
        };
      });
  },
  methods: {
    displaySuccessfulChanges() {
      this.$buefy.notification.open({
        message: 'Changes successfully saved',
        type: 'is-success',
        duration: 5000,
      });
    },
    displayUnexpectedError() {
      this.$buefy.notification.open({
        message: 'Unexpected error. Please try again or contact system admin.',
        type: 'is-danger',
        duration: 5000,
      });
    },
    databasePost(collectionName, documentId, fieldToChange, newFieldValue) {
      return this.$axios
        .post(`/api/admin/active`, {
          mongoName: collectionName,
          _id: documentId,
          fieldToChange: fieldToChange,
          newFieldValue: newFieldValue,
        })
        .then((res) => {
          if (res.status === 200) {
            this.displaySuccessfulChanges();
            return true;
          } else {
            this.displayUnexpectedError();
            return false;
          }
        })
        .catch((err) => {
          this.displayUnexpectedError();
          return false;
        });
    },
    updateLdapGroup(groupIndex, newGroup) {
      this.$buefy.dialog.confirm({
        title: 'Confirm update',
        message:
          'Update LDAP group with changes made? If you have made no changes, please press "Cancel"',
        ...defaultDialogOptions,
        onConfirm: async () => {
          return this.$axios
            .post(`/api/admin/group`, {
              group: newGroup,
            })
            .then((res) => {
              if (res.status === 200) {
                this.ldapGroups[groupIndex] = newGroup;
                this.displaySuccessfulChanges();
                return;
              } else {
                this.displayUnexpectedError();
                return;
              }
            })
            .catch((err) => {
              this.displayUnexpectedError();
              return false;
            });
        },
      });
    },
    promptToArchive(editItemsIndex, itemIndex, itemId) {
      this.$buefy.dialog.confirm({
        title: 'Approve archive',
        message: 'Are you sure you want to archive this field?',
        ...defaultDialogOptions,
        onConfirm: async () => {
          const res = await this.databasePost(
            this.editItems[editItemsIndex].mongoName,
            itemId,
            'archived',
            true
          );
          if (res.status === 200) {
            const editItemsClone = this.editItems.slice();
            const move = editItemsClone[editItemsIndex].active[itemIndex];
            this.editItems[editItemsIndex].active.splice(itemIndex, 1);
            this.editItems[editItemsIndex].archived.push(move);
          }
        },
      });
    },
    promptToReactivate(editItemsIndex, itemIndex, itemId) {
      this.$buefy.dialog.confirm({
        title: 'Approve activate',
        message: 'Are you sure you want to re-activate this field?',
        ...defaultDialogOptions,
        onConfirm: async () => {
          const res = this.databasePost(
            this.editItems[editItemsIndex].mongoName,
            itemId,
            'archived',
            false
          );
          if (res.status === 200) {
            const editItemsClone = this.editItems.slice();
            const move = editItemsClone[editItemsIndex].archived[itemIndex];
            this.editItems[editItemsIndex].archived.splice(itemIndex, 1);
            this.editItems[editItemsIndex].active.push(move);
          }
        },
      });
    },
    getIsClosable: (activeArr, activeItem, objMongoName) => {
      if (
        // disable webmasters from being deleted in admin section
        process.env.WEBMASTER === activeItem.name &&
        objMongoName === 'Admin'
      ) {
        return false;
      } else {
        return activeArr.length > 1;
      }
    },
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    submitAdditional(editItemsIndex) {
      const { mongoName, toAdd } = this.editItems[editItemsIndex];

      this.$buefy.dialog.confirm({
        title: 'Approve addition',
        message: 'Are you sure you want to add this entry?',
        ...defaultDialogOptions,
        onConfirm: async () => {
          const trimmedToAdd = toAdd.trim();

          return this.$axios
            .post(`/api/admin/additional`, {
              mongoName: mongoName,
              newFieldValue: trimmedToAdd,
            })
            .then((res) => {
              if (res.status === 200) {
                this.displaySuccessfulChanges();
                this.editItems[editItemsIndex].active.push({
                  archived: false,
                  name: trimmedToAdd,
                });
                return true;
              } else {
                this.displayUnexpectedError();
                return false;
              }
            })
            .catch((err) => {
              this.displayUnexpectedError();
              return false;
            })
            .finally(() => {
              this.editItems[editItemsIndex].toAdd = '';
            });
        },
      });
    },
    getDisabledAddNew(index) {
      const { toAdd } = this.editItems[index];

      if (toAdd === '') {
        return true;
      }

      const trimmedToAdd = toAdd.trim();

      const allNames = [];
      this.editItems.forEach((item) => {
        item.active.forEach((activeItem) => {
          allNames.push(activeItem.name);
        });
        item.archived.forEach((archivedItem) => {
          allNames.push(archivedItem.name);
        });
      });

      if (allNames.includes(trimmedToAdd)) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped>
.margin-b-tag {
  padding-bottom: 10px;
}
.group-field > * {
  margin-bottom: 40px;
}
.my-nav-bar {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
}
.nav-bar-item {
  display: flex;
  padding-right: 40px;
}
.is-active {
  font-weight: bold;
  text-decoration: underline;
  color: purple;
}
.pb-10 {
  padding-bottom: 10px;
}
</style>
