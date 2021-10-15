import emptyMasterPlateTemplate from './hardcodedTemplates/emptyMasterPlateTemplate';

import twelve_selectedWells_vertical from './hardcodedTemplates/vertical/twelve_selectedWells_vertical'
import eighteen_selectedWells_vertical from './hardcodedTemplates/vertical/eighteen_selectedWells_vertical'
import twentyfour_selectedWells_vertical from './hardcodedTemplates/vertical/twentyfour_selectedWells_vertical'
import thirty_selectedWells_vertical from './hardcodedTemplates/vertical/thirty_selectedWells_vertical'
import thirtysix_selectedWells_vertical from './hardcodedTemplates/vertical/thirtysix_selectedWells_vertical'
import fortytwo_selectedWells_vertical from './hardcodedTemplates/vertical/fortytwo_selectedWells_vertical'
import fortyeight_selectedWells_vertical from './hardcodedTemplates/vertical/fortyeight_selectedWells_vertical'

import twelve_selectedWells_horizontal from './hardcodedTemplates/horizontal/twelve_selectedWells_horizontal'
import eighteen_selectedWells_horizontal from './hardcodedTemplates/horizontal/eighteen_selectedWells_horizontal'
import twentyfour_selectedWells_horizontal from './hardcodedTemplates/horizontal/twentyfour_selectedWells_horizontal'
import thirty_selectedWells_horizontal from './hardcodedTemplates/horizontal/thirty_selectedWells_horizontal'
import thirtysix_selectedWells_horizontal from './hardcodedTemplates/horizontal/thirtysix_selectedWells_horizontal'
import fortytwo_selectedWells_horizontal from './hardcodedTemplates/horizontal/fortytwo_selectedWells_horizontal'
import fortyeight_selectedWells_horizontal from './hardcodedTemplates/horizontal/fortyeight_selectedWells_horizontal'

const getSlots = (numberOfWellSelections, fillDirection) => {
    //console.log('about to get slots with:', numberOfWellSelections, fillDirection);
    
    // default
    if (fillDirection === 'vertically' || fillDirection === 'vertical'){

        switch (numberOfWellSelections) {
            case 12:
                console.log('returning twelve_selectedWells_vertical slot!');
                return twelve_selectedWells_vertical;        
            case 18:
                console.log('returning eighteen_selectedWells_vertical slot!');
                return eighteen_selectedWells_vertical;
            case 24:
                console.log('returning twentyfour_selectedWells_vertical slot!');
                return twentyfour_selectedWells_vertical;      
            case 30:
                console.log('returning thirty_selectedWells_vertical slot!');
                return thirty_selectedWells_vertical;
            case 36:
                console.log('returning thirtysix_selectedWells_vertical slot!');
                return thirtysix_selectedWells_vertical;
            case 42:
                console.log('returning fortytwo_selectedWells_vertical slot!');
                return fortytwo_selectedWells_vertical;        
            case 48:
                console.log('returning fortyeight_selectedWells_vertical slot!');
                return fortyeight_selectedWells_vertical;
            default:
                console.log('returning no vertical slot!');
                throw new Error;        
        }

    } else {
        // not the default by design 
        // TODO refactor so defaults to vertically if null / error

        switch (numberOfWellSelections) {
            case 12:
                console.log('returning twelve_selectedWells_horizontal slot!');
                return twelve_selectedWells_horizontal;        
            case 18:
                console.log('returning eighteen_selectedWells_horizontal slot!');
                return eighteen_selectedWells_horizontal;
            case 24:
                console.log('returning twentyfour_selectedWells_horizontal slot!');
                return twentyfour_selectedWells_horizontal;     
            case 30:
                console.log('returning thirty_selectedWells_horizontal slot!');
                return thirty_selectedWells_horizontal;
            case 36:
                console.log('returning thirtysix_selectedWells_horizontal slot!');
                return thirtysix_selectedWells_horizontal;
            case 42:
                console.log('returning fortytwo_selectedWells_horizontal slot!');
                return fortytwo_selectedWells_horizontal;        
            case 48:
                console.log('returning fortyeight_selectedWells_horizontal slot!');
                return fortyeight_selectedWells_horizontal;
            default:
                console.log('returning no horizontal slot!');
                throw new Error('no slot found');        
        }
    }
};

const calculateWithSlots = (orderedWellSelections, volumeToInsertPerWell, slots) => {

    // probably dont need to assign from args but safety
    let slottedMasterPlateTemplate = Object.assign({}, emptyMasterPlateTemplate);
    let wellSels = orderedWellSelections;

    Object.keys(slots).forEach(slotNumber => {
        const indexOfArrayThatSlotNumberNeedsToAccess = (slotNumber - 1);
        
        const {coordinates, level} = slots[slotNumber];

        if (!wellSels[indexOfArrayThatSlotNumberNeedsToAccess]){
            console.log('big issue with wellsels', wellSels, wellSels[indexOfArrayThatSlotNumberNeedsToAccess])
        }
    
        coordinates.forEach(coordinate => {
                            
            slottedMasterPlateTemplate[coordinate][level] = {
                ec: wellSels[indexOfArrayThatSlotNumberNeedsToAccess].ec,
                fr: wellSels[indexOfArrayThatSlotNumberNeedsToAccess].fr,
                volume: volumeToInsertPerWell,
                slotNumber: slotNumber,
            };
        })
    })

    return slottedMasterPlateTemplate;
};

const calculateWellsForMasterPlate = (orderedWellSelections, fillDirection, volumeToInsertPerWell) => {

    //console.log('WEIL');
    if (!orderedWellSelections){
        console.error('no orederedWellSelections found!')
    }
    if (orderedWellSelections === {}){
        console.error('orrderedwellselectison === {} discovered')
    }
    if (typeof(orderedWellSelections) !== 'object'){
        console.error('object not found, type is', typeof(orderedWellSelections));
    }

    console.log('arrived at calculateWells with no errors. inputs are:', orderedWellSelections, fillDirection, volumeToInsertPerWell)

    const theSlots = getSlots(Object.keys(orderedWellSelections).length, fillDirection);
    console.log('gotSlots result', theSlots, theSlots.length);
    
    const masterPlateWells = calculateWithSlots(orderedWellSelections, volumeToInsertPerWell, theSlots);
    console.log('gotsummintoreturn', masterPlateWells);
    return masterPlateWells;
};

export default calculateWellsForMasterPlate;