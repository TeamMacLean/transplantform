<template>
  <div>
    <h1 class="title is-2">Edit database (Admin)</h1>

    <h3 v-if="isAdmin" class="title is-4">I am an admin user</h3>
    <div v-else class="title is-4">
      <p>I am a regular user (SHOULDN'T BE HERE)</p>
      <p>You are not permitted to view this page.</p>
    </div>

    <div class="crudWrapper">
      <div class="section">
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
                <div
                  v-for="(activeItem, jIndex) in obj.active"
                  :key="'jjj' + jIndex"
                  class="margin-b-tag"
                >
                  <b-tag
                    size="is-medium"
                    :closable="getIsClosable(obj.active)"
                    aria-close-label="Close tag"
                    @close="promptToArchive(index, jIndex, activeItem._id)"
                  >
                    {{ activeItem.name }}
                  </b-tag>
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
  </div>
</template>

<script>
import {
  getGenotypes,
  getSpecies,
  getVectorSelections,
  getTdnaSelections,
  getAgroStrains,
} from '../modules/hardcodedData.js';
import { getLdapGroups } from '../modules/authUtilities.js';
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

  // TODO async data fetching
  data() {
    const { user } = this.$auth.$state;
    const { username, isAdmin } = user;

    // TODO async
    const allSpecies = getSpecies();
    const allGenotypes = getGenotypes();
    const allVectorSelections = getVectorSelections();
    const allTdnaSelections = getTdnaSelections();
    const allAgroStrains = getAgroStrains();

    // TODO get _id field from hardcoded data, rather than spooned in here
    const editItems = [
      {
        name: 'Species',
        mongoName: 'species',
        active: allSpecies.filter((specie) => !specie.archived),
        archived: allSpecies.filter((specie) => specie.archived),
        toAdd: '',
        _id: 'joij;oij;oijo;i',
      },
      {
        name: 'Genotypes',
        mongoName: 'genotypes',
        active: allGenotypes.filter((specie) => !specie.archived),
        archived: allGenotypes.filter((specie) => specie.archived),
        toAdd: '',
        _id: 'h;iuh;oih;oih',
      },
      {
        name: 'Vector selections',
        mongoName: 'vectors',
        active: allVectorSelections.filter((specie) => !specie.archived),
        archived: allVectorSelections.filter((specie) => specie.archived),
        toAdd: '',
        _id: 'opafiewjofiejwfoi;wjefoi;j',
      },
      {
        name: 'T-DNA selections',
        mongoName: 'tdnaSelections',
        active: allTdnaSelections.filter((specie) => !specie.archived),
        archived: allTdnaSelections.filter((specie) => specie.archived),
        toAdd: '',
        _id: 'ewifjejw;oeifj;weoifjoiowifjeif',
      },
      {
        name: 'Agro Strains',
        mongoName: 'agroStrains',
        active: allAgroStrains.filter((specie) => !specie.archived),
        archived: allAgroStrains.filter((specie) => specie.archived),
        toAdd: '',
        _id: 'iiiiiiiooijo;ih',
      },
    ];

    const ldapGroups = getLdapGroups();

    return {
      username: username,
      isAdmin: isAdmin,
      ldapGroups: ldapGroups,
      editItems: editItems,
      activeTab: 'species',
    };
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
        .post(`/api/admin`, {
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
        message: 'Update LDAP group with changes made?',
        ...defaultDialogOptions,
        onConfirm: async () => {
          return this.$axios
            .post(`/api/group`, {
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
    getIsClosable: (activeArr) => {
      return activeArr.length > 1;
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
            .post(`/api/additional`, {
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
</style>
