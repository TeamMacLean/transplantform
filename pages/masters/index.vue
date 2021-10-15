<template>
  <div>
    <div v-if="mastersActive.length">
      <h1 class="title">Active</h1>
      <div :key='i' class="columns" v-for="i in Math.ceil(mastersActive.length / 4)">
        <div :key='master._id' class="column is-3" v-for="master in mastersActive.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/masters/'+master._id">
            <StockCard :stock="master"></StockCard>
          </nuxt-link>
        </div>
      </div>
    </div>


    <div v-if="mastersRetired.length">
      <hr/>
      <h1 class="title">Retired</h1>

      <div :key='i' class="columns" v-for="i in Math.ceil(mastersRetired.length / 4)">
        <div :key='master._id' class="column is-3" v-for="master in mastersRetired.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/masters/'+master._id">
            <StockCard :stock="master"></StockCard>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div v-if="!mastersActive.length && !mastersRetired.length">
      <p>No Masters Found.</p>
    </div>
  </div>
</template>

<script>
  import StockCard from '../../components/StockCard'

  const labels = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12',
  ];

  export default {
    middleware: 'auth',
    components: {StockCard},
    asyncData({$axios, store}) {
      return $axios.get('/api/master')
        .then((res) => {

          const toTest = [...res.data.mastersActive, ...res.data.mastersRetired]
        
          var loggy = '';
          var results = toTest.map((master) => {
            var uniqueFrs = [];
            var correspondingUniqueFrsCounts = [];
            var masterPlateNameAndIndex = [];
            // const testMasterPlates = [master.masterPlates[0]]
            master.masterPlates.forEach((masterPlate, masterPlateIndex) => {
              labels.forEach(label => {

                var targetFr = masterPlate[label].upper.fr
                var masterPlateId = {name: master.name, plateIndex: masterPlateIndex}

                if (!uniqueFrs.includes(targetFr)){
                  uniqueFrs.push(targetFr)
                  correspondingUniqueFrsCounts.push(1)
                  masterPlateNameAndIndex.push([masterPlateId])

                } else {
                  var indexOfUniqueFrInArray = uniqueFrs.findIndex((element) => (targetFr === element))
                  correspondingUniqueFrsCounts[indexOfUniqueFrInArray]++;

                  const already = !!(masterPlateNameAndIndex.filter(alreadyObj => 
                    alreadyObj.name === masterPlateId.name && alreadyObj.plateIndex === masterPlateId.plateIndex
                  ).length)

                  if (!already){
                    //FR14426449 in these: mp:1&mp:2&mp:2&mp:2&mp:3&mp:3&mp:3
                    //loggy += '\nCannot find ' + masterPlateIdStr + ' in ' + masterPlateNameAndIndex.toString();
                    masterPlateNameAndIndex[indexOfUniqueFrInArray].push(masterPlateId);
                  }

                }
              })
            })

            const dividesByThree = (n) => n % 3 == 0

            const frsObject = uniqueFrs.map((frNumber, index) => {
              const theCount = correspondingUniqueFrsCounts[index];

              var uniqueInstances = [];
              masterPlateNameAndIndex[index].forEach(masterPlateId => {
                var already = uniqueInstances.filter(instance => instance.name === masterPlateId.name && instance.plateIndex === masterPlateId.plateIndex).length
                if (!already){uniqueInstances.push(masterPlateId)}
              })

              // check every unique instance occurs 3x
              var correctCount;
              if (frNumber === null){
                correctCount = dividesByThree(masterPlateNameAndIndex[index].length)
              } else {
                correctCount = uniqueInstances.every(instance => {
                  var countInTotal = masterPlateNameAndIndex[index].filter(obj => obj.name === instance.name && obj.plateIndex === instance.plateIndex).length
                  return countInTotal === 3;
                })
              }

              const result = {
                code: frNumber, 
                count: theCount,
                featuresIn: masterPlateNameAndIndex[index],
                uniqueFeaturesIn: uniqueInstances,
                correctCount: correctCount,
              }

              if (!correctCount){
                console.error(result)
              }

              return result
            })

            const returnObj = {
              masterName: master.name,
              frs: frsObject,
            };

            return returnObj
          })
          
          return {
            mastersActive: res.data.mastersActive ? res.data.mastersActive : [],
            mastersRetired: res.data.mastersRetired ? res.data.mastersRetired : [],
          }
        })
        .catch(err => {
          console.error(err);
          return {
            mastersActive: [],
            mastersRetired: []
          }
        })
    },
  }
</script>
