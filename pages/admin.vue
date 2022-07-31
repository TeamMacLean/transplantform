<template>
  <div>
    <h1 class="title is-2">Admin area</h1>

    <h3 v-if="isAdmin" class="title is-4">I am an admin user</h3>
    <div v-else class="title is-4">
      <p>I am a regular user (SHOULDN'T BE HERE)</p>
      <p>You are not permitted to view this page.</p>
    </div>

    <div class="crudWrapper">
      <div class="section">
        <div class="container">
          <b-tabs class="block" :animated="false">
            <b-tab-item
              v-for="(obj, index) in editItems"
              :key="index"
              :label="obj.name"
            >
              <label class="label">Active</label>
              <div
                v-for="(item, jIndex) in obj.active"
                :key="jIndex"
                class="margin-b-tag"
              >
                <b-tag
                  size="is-medium"
                  closable
                  aria-close-label="Close tag"
                  @close="promptToArchive(index, jIndex)"
                >
                  {{ item.name }}
                </b-tag>
              </div>
              <br />
              <label class="label">Archived</label>
              <div
                v-for="(item, kIndex) in obj.archived"
                :key="kIndex"
                class="margin-b-tag"
              >
                <b-tag
                  size="is-medium"
                  closable
                  attached
                  close-icon="upload"
                  aria-close-label="Close tag"
                  @close="promptToReactivate(index, kIndex)"
                >
                  {{ item.name }}
                </b-tag>
              </div>
            </b-tab-item>
            <b-tab-item label="LDAP groups">
              <div v-for="(group, lIndex) in ldapGroups" :key="lIndex">
                {{ group.name }}
              </div>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAutocompleteGenotypes,
  getSpecies,
  getVectorSelections,
  getTdnaSelections,
  getAgroStrains,
} from '../modules/hardcodedData.js';
import { getLdapGroups } from '../modules/authUtilities.js';
export default {
  middleware: 'auth',
  // components: {
  //   FormConstructCard,
  // },

  // TODO async data fetching
  data() {
    const { user } = this.$auth.$state;
    const { username, isAdmin } = user;

    // TODO async
    const allSpecies = getSpecies();
    // TODO async
    const allGenotypes = getAutocompleteGenotypes();
    // TODO async
    const allVectorSelections = getVectorSelections();
    // TODO async
    const allTdnaSelections = getTdnaSelections();
    // TODO async
    const allAgroStrains = getAgroStrains();

    const editItems = [
      {
        name: 'Species',
        active: allSpecies.filter((specie) => specie.archived),
        archived: allSpecies.filter((specie) => !specie.archived),
      },
      {
        name: 'Genotypes',
        active: allGenotypes.filter((specie) => specie.archived),
        archived: allGenotypes.filter((specie) => !specie.archived),
      },
      {
        name: 'Vector selections',
        active: allVectorSelections.filter((specie) => specie.archived),
        archived: allVectorSelections.filter((specie) => !specie.archived),
      },
      {
        name: 'T-DNA selections',
        active: allTdnaSelections.filter((specie) => specie.archived),
        archived: allTdnaSelections.filter((specie) => !specie.archived),
      },
      {
        name: 'Agro Strains',
        active: allAgroStrains.filter((specie) => specie.archived),
        archived: allAgroStrains.filter((specie) => !specie.archived),
      },
    ];

    const ldapGroups = getLdapGroups();

    return {
      username: username,
      isAdmin: isAdmin,
      ldapGroups: ldapGroups,
      editItems: editItems,
    };
  },
  methods: {
    promptToArchive(editItemsIndex, itemIndex) {
      alert(
        'Removing ' + this.editItems[editItemsIndex].active[itemIndex].name
      );
    },
    promptToReactivate(editItemsIndex, itemIndex) {
      alert(
        'Restoring ' + this.editItems[editItemsIndex].archived[itemIndex].name
      );
    },
  },
  computed: {},
};
</script>

<style scoped>
.margin-b-tag {
  padding-bottom: 10px;
}
</style>
