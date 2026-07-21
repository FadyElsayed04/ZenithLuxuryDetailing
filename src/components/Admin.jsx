import React, { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// PACKAGE + ADD-ON CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const PACKAGES = [
  'Silver Interior',
  'Silver Exterior',
  'Gold Interior',
  'Gold Exterior',
  'Silver Full Detail',
  'Gold Full Detail',
  'Platinum Full Detail',
]

const ADDONS = [
  { id: 'leather',   title: 'Leather Conditioning & Protection',    price: '+$40' },
  { id: 'fabric',    title: 'Fabric Guard / Upholstery Protection',  price: '+$40' },
  { id: 'trim',      title: 'Trim Restoration + Ceramic Protection', price: '+$50' },
  { id: 'pethair',   title: 'Pet Hair Removal',                      price: '+$20-$100' },
  { id: 'headlight', title: 'Headlight Restoration',                 price: '+$80' },
  { id: 'engine',    title: 'Engine Bay Refresh',                    price: '+$60' },
  { id: 'sticker',   title: 'Sticker Removal',                       price: 'Varies' },
]

const PACKAGE_RULES = {
  'Silver Interior':     { selectable: ['pethair', 'headlight', 'engine', 'sticker'],                              included: [] },
  'Silver Exterior':     { selectable: ['trim', 'headlight', 'engine', 'sticker'],                                  included: [] },
  'Gold Interior':       { selectable: ['leather', 'fabric', 'pethair', 'headlight', 'engine', 'sticker'],         included: [] },
  'Gold Exterior':       { selectable: ['trim', 'headlight', 'engine', 'sticker'],                                  included: [] },
  'Silver Full Detail':  { selectable: ['trim', 'pethair', 'headlight', 'engine', 'sticker'],                      included: [] },
  'Gold Full Detail':    { selectable: ['leather', 'fabric', 'trim', 'pethair', 'headlight', 'engine', 'sticker'], included: [] },
  'Platinum Full Detail':{ selectable: ['pethair', 'headlight', 'sticker'],                                         included: ['leather', 'fabric', 'trim', 'engine'] },
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD-ON STEPS
// ─────────────────────────────────────────────────────────────────────────────
const ADDON_STEPS = {
  engine: [
    'Preparation: Unlock the car and roll down a window. Ensure the engine is cool before starting. Disconnect the battery if you are concerned about electrical safety.',
    'Debris Removal: Pick up leaves and debris by hand first, then use a Vacuum to remove smaller debris. Follow up with the Tornador Gun to blow out any remaining dirt or dust from tight spaces.',
    'Pre-Rinse: Using the Pressure Washer with a 50° nozzle, stand farther back to avoid concentrated pressure. Lightly rinse the engine bay and bottom of the hood, avoiding sensitive areas such as the alternator, belts, fuse box, and battery vent.',
    'Foam Application: Spray Koch Chemie Green Star diluted 1:10 across the engine bay and underside of the hood. Avoid direct spraying on sensitive components.',
    'Agitation: Use an Exterior Detail Brush (soft) for sensitive components and a Medium Detail Brush for heavier grime areas. Lightly agitate all accessible surfaces.',
    'Rinse: Using the Pressure Washer with a 50° nozzle, stand farther back. Lightly rinse the engine bay and bottom of the hood, avoiding sensitive areas.',
    'Drying: Use the Tornador Gun to blow out trapped water from tight and electrical components.',
    'Air Dry and Reconnect: Let the engine bay air dry completely and give it some time before reconnecting the battery and starting the car.',
  ],
  sticker: [
    'Exterior Glass: Heat the sticker with the Steamer and use Plastic or Metal Blades at a low angle. Keep surface wet (glass cleaner or water).',
    'Interior Glass: Heat the sticker with the Heat Gun on low heat and use Plastic Blades only at a low angle. Keep surface wet (glass cleaner or water).',
    'Remove Residue: Apply Goo Gone undiluted and allow 60 seconds dwell time. Wipe with a Microfiber Cloth, then follow with Isopropyl Alcohol (70%) to remove remaining residue.',
    'Final Wipe: Final clean with glass cleaner.',
  ],
  headlight: [
    'Preparation: Park the vehicle in a shaded area and ensure headlights are clean, cool and dry. Mask off all surrounding paint, trim, and edges using tape to prevent damage.',
    'Initial Clean: Rinse the headlights and wipe with a Microfiber Cloth to remove loose dirt and debris.',
    'Wet Sand (Low Grit): Using the lowest grit from the kit, keep the surface wet and sand evenly across the entire headlight to remove heavy oxidation.',
    'Wet Sand (Mid Grit): Move to the next grit and continue sanding evenly to refine scratches and improve clarity. Keep the surface wet at all times.',
    'Wet Sand (Fine Grit): Use the finest grit to smooth the surface and prepare for polishing. Wipe and inspect between each step.',
    'Rinse and Dry: Rinse the headlights and wipe with a Microfiber Cloth. Make sure the sanding is consistent throughout.',
    'Polishing: Apply the polishing compound from the kit and work evenly across the headlight until clarity is restored. Wipe clean with a Microfiber Cloth.',
    'Final Inspection: Remove masking tape and inspect for clarity, uniform finish, and any missed areas.',
  ],
  pethair: [
    'Pet Hair Removal: Spray Pol Star diluted 1:10 over carpet to loosen fibers. Use a Pet Hair Removal Tool to gather up as much pet hair as you can and use a Tornador Gun and vacuum to assist.',
  ],
  fabric: [
    'Fabric Guard: Spray Fabric Coat lightly over fabric ensuring all fabric is evenly covered. Using Nitrile Gloves massage the product into the fibers and allow to dry for 10 min.',
  ],
  leather: [
    'Leather Conditioner: Spray a small amount of Leather Coat onto the applicator and work it in small sections on leather. Apply on seats, doors, steering wheel, and middle console. Let it sit for 15 min and afterwards wipe with a dry Microfiber Cloth.',
  ],
  trim: [
    'Dry Completely: Ensure the trim is 100% dry before application. Open doors, trunk, and gaps to release trapped water. Any moisture will affect bonding.',
    'Application: Put on gloves and use one Cerakote wipe. Apply evenly across the trim using slow, overlapping passes to ensure full and consistent coverage.',
    'Leveling: Continue spreading the product evenly, flipping the wipe as needed. Avoid over-applying and ensure no streaks or high spots are left.',
    'Initial Cure: Allow the coating to sit and cure without touching. Avoid contact with water or moisture for at least 1 hour after application.',
    'Final Inspection: Check for uniform finish and full coverage. Ensure trim appears evenly restored with no missed or uneven areas.',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// PACKAGE STEPS
// Each item is one of:
//   { type: 'section', title: '...' }   → section header, resets step numbering
//   { type: 'step',    text:  '...' }   → numbered step within current section
//   { type: 'addon',   id:    '...' }   → insert addon steps here if selected/included
// ─────────────────────────────────────────────────────────────────────────────
const PACKAGE_STEPS = {

  // ── SILVER INTERIOR ────────────────────────────────────────────────────────
  'Silver Interior': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for stains, odors, pet hair, salt buildup, scratches, or damage and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate anything that may not be fully removable such as deep stains, permanent discoloration, or strong odors.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrades or add-ons such as pet hair removal, stain extraction, odor treatment, or higher tier packages if needed.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and overall cabin.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take close-up photos of stains, debris, pet hair, salt, or heavily soiled areas.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, door panels, and center console areas.' },
    { type: 'step', text: 'Mats and Trunk: Take photos of floor mats and trunk condition before removal and cleaning.' },
    { type: 'step', text: 'Documentation: Ensure photos clearly show the starting condition for before/after comparison.' },
    { type: 'step', text: 'Take Videos: Take content of the car before the detail showing: Interior, Wheels, certain debris or stains and anything that is getting done.' },

    { type: 'section', title: 'Remove All Items and Mats' },
    { type: 'step', text: 'Floor Mats: Remove all floor mats.' },
    { type: 'step', text: 'Items and Garbage: Remove all items and garbage putting them into 2 boxes, one to throw out and one to keep for the customer.' },

    { type: 'section', title: 'Fabric Mats' },
    { type: 'step', text: 'Blow Out Surface: Place the mats in a clean work area and use a Tornador Gun to blow out dirt and dust.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the vacuum over the entire mat even for non-visible debris. If stubborn debris persists, use a stiff brush to agitate or a Tornador Gun again.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Carpet Lines: Lightly mist Pol Star 1:10 and use a Carpet Line Brush to create clean, uniform lines.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'section', title: 'Rubber Mats' },
    { type: 'step', text: 'Use your hands and knock loose debris out of mat.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides.' },
    { type: 'step', text: 'Deep Clean: Spray Green Star APC diluted 1:10 onto rubber mats. Agitate aggressively using a Stiff Drill Brush. Rinse thoroughly with pressure washer.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides to clean off foam and debris.' },
    { type: 'step', text: 'Use a Tornador Gun to dry mat as much as possible.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Interior Detailing' },
    { type: 'step', text: 'Tornador Gun: Use the Tornador Gun on the carpets, seats, console edges and pockets, doors (everything) to loosen all stubborn debris.' },
    { type: 'step', text: 'Pedals: Spray Koch Chemie Green Star 1:10. Agitate using a Stiff Brush to remove dirt and grime. Wipe clean with Microfiber.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the Vacuum on the carpet, seats, console, cup holders, doors, between seats, trunk (everything). Use a Crevice Brush or toothpick to loosen debris. Make sure to move seats back and forth to reach everything, also Vacuum in the seat crevice, seat holes and between the seat and center console. If stubborn debris persists, agitate using a Soft Interior Brush or Crevice Brush depending on the area before vacuuming again.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Door Pockets and Cup Holders: Using distilled water, apply steam to dissolve gunk. Wipe as you steam. Make sure to get the cup, door holders, and crevices.' },
    { type: 'step', text: 'High Contact Areas: Spray Pol Star 1:10 onto a Soft Interior Brush. Agitate surfaces until clean and foamy. For heavily soiled or greasy areas, increase to Pol Star 1:5. Wipe dry with Microfiber.' },
    { type: 'step', text: 'All Plastic: Spray Pol Star 1:10 onto a Soft Detail Brush. Lightly agitate and wipe clean with Microfiber. Avoid clear or piano black surfaces; use ONR 1:10 for those areas.' },
    { type: 'step', text: 'Fabric and Leather: Spray Pol Star 1:10. Use a Horse Hair Brush for leather and Soft Brush for fabric. Agitate gently, then wipe with a damp Microfiber Cloth followed by a dry one.' },
    { type: 'step', text: 'All Glass, Mirrors and Screens: Spray Invisible Glass Cleaner on all glass, mirrors, screens and sunroof. Wipe clean with a diamond weave Microfiber Cloth. Complete one at a time and do not let it dry. In direct sunlight, put an old drying towel over glass while working.' },
    { type: 'addon', id: 'fabric' },
    { type: 'addon', id: 'leather' },
    { type: 'step', text: 'Final Vacuum: Vacuum any visible debris on the carpets, between seats and trunk as a final pass.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },
    { type: 'step', text: 'Rubber TouchUp: Spray some GUF onto the rubber mats and pedals, buff on with an applicator then wipe excess dry with a Microfiber Cloth.' },
    { type: 'step', text: 'Final Touches: Place an Air Freshener onto the rearview mirror. Place a Plastic Cover onto the steering wheel and shift knob. Fold a microfiber cloth into a pouch and place a business card, 2+ Mints and an Air Freshener Instruction Card. Place the mats back inside and lay a Paper Mat on the driver\'s side floor.' },

    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Interior Check: Inspect all surfaces including seats, carpets, dashboard, doors, trunk, and mats to ensure everything is cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for any remaining dust, debris, streaks, or missed spots and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure no streaks on glass, no residue on plastics, and even finish across all surfaces.' },
    { type: 'step', text: 'Final Touches Check: Confirm air freshener, plastic covers, paper mat, and gift pouch are properly placed.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining imperfections or limitations to communicate honestly with the customer.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and full cabin after completion.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take after photos of previously dirty or problem areas to show improvement.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, and door panels after cleaning.' },
    { type: 'step', text: 'Mats and Setup: Take photos before and after the paper floor mat and plastic covers are in place.' },
    { type: 'step', text: 'Final Presentation: Take clean, well-lit photos highlighting the finished result for marketing and records.' },
    { type: 'step', text: 'Take Videos: Take content of the car after the detail showing: Interior, Wheels, certain debris or stains and anything that got done.' },
  ],

  // ── GOLD INTERIOR ──────────────────────────────────────────────────────────
  'Gold Interior': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for stains, odors, pet hair, salt buildup, scratches, or damage and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate anything that may not be fully removable such as deep stains, permanent discoloration, or strong odors.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrades or add-ons such as pet hair removal, stain extraction, odor treatment, or higher tier packages if needed.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and overall cabin.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take close-up photos of stains, debris, pet hair, salt, or heavily soiled areas.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, door panels, and center console areas.' },
    { type: 'step', text: 'Mats and Trunk: Take photos of floor mats and trunk condition before removal and cleaning.' },
    { type: 'step', text: 'Documentation: Ensure photos clearly show the starting condition for before/after comparison.' },
    { type: 'step', text: 'Take Videos: Take content of the car before the detail showing: Interior, Wheels, certain debris or stains and anything that is getting done.' },

    { type: 'section', title: 'Remove All Items and Mats' },
    { type: 'step', text: 'Floor Mats: Remove all floor mats.' },
    { type: 'step', text: 'Items and Garbage: Remove all items and garbage putting them into 2 boxes, one to throw out and one to keep for the customer.' },

    { type: 'section', title: 'Fabric Mats' },
    { type: 'step', text: 'Blow Out Surface: Place the mats in a clean work area and use a Tornador Gun to blow out dirt and dust.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the vacuum over the entire mat even for non-visible debris. If stubborn debris persists, use a stiff brush to agitate or a Tornador Gun again.' },
    { type: 'step', text: 'Salt Stain Removal: Spray White Vinegar diluted 1:1 directly onto salt stains. Agitate using a Drill Brush (soft) followed by a Stiff Carpet Brush for edges and heavy buildup. Use a Steamer to further break down salt deposits. Extract thoroughly to remove residue and moisture. Follow with Pol Star 1:10 for final cleaning and neutralization.' },
    { type: 'step', text: 'Carpet Stain Removal: Spray P&S Terminator undiluted directly onto stains. Agitate using a Drill Brush (soft). Use a Steamer if needed to break down stubborn stains, then extract fully. Finish with Pol Star 1:10. If staining remains or the area is heavily soiled, use Pol Star 1:5 for a second pass.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Carpet Lines: Lightly mist Pol Star 1:10 and use a Carpet Line Brush to create clean, uniform lines.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'section', title: 'Rubber Mats' },
    { type: 'step', text: 'Use your hands and knock loose debris out of mat.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides.' },
    { type: 'step', text: 'Deep Clean: Spray Green Star APC diluted 1:10 onto rubber mats. Agitate aggressively using a Stiff Drill Brush. Rinse thoroughly with pressure washer.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides to clean off foam and debris.' },
    { type: 'step', text: 'Use a Tornador Gun to dry mat as much as possible.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Interior Detailing' },
    { type: 'step', text: 'Tornador Gun: Use the Tornador Gun on the carpets, seats, console edges and pockets, doors (everything) to loosen all stubborn debris.' },
    { type: 'step', text: 'Pedals: Spray Koch Chemie Green Star 1:10. Agitate using a Stiff Brush to remove dirt and grime. Wipe clean with Microfiber.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the Vacuum on the carpet, seats, console, cup holders, doors, between seats, trunk (everything). Use a Crevice Brush or toothpick to loosen debris. Make sure to move seats back and forth to reach everything, also Vacuum in the seat crevice, seat holes and between the seat and center console. If stubborn debris persists, agitate using a Soft Interior Brush or Crevice Brush depending on the area before vacuuming again.' },
    { type: 'step', text: 'Salt Stain Removal: Spray White Vinegar diluted 1:1 directly onto salt stains. Agitate using a Drill Brush (soft) followed by a Stiff Carpet Brush for edges and heavy buildup. Use a Steamer to further break down salt deposits. Extract thoroughly to remove residue and moisture. Follow with Pol Star 1:10 for final cleaning and neutralization.' },
    { type: 'step', text: 'Stain Removal: Spray P&S Terminator undiluted onto stains. Agitate using a Drill Brush (soft). Use a Steamer if needed, then extract thoroughly. Finish with Pol Star 1:10. If stains persist or the area is heavily contaminated, follow with Pol Star 1:5.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Door Pockets and Cup Holders: Using distilled water, apply steam to dissolve gunk. Wipe as you steam. Make sure to get the cup, door holders, and crevices.' },
    { type: 'step', text: 'Sanitation: Using distilled water, apply steam to sanitize high contact surfaces. Wipe as you steam. Make sure to get the steering wheel, shifter, door handle, armrest, etc.' },
    { type: 'step', text: 'High Contact Areas: Spray Pol Star 1:10 onto a Soft Interior Brush. Agitate surfaces until clean and foamy. For heavily soiled or greasy areas, increase to Pol Star 1:5. Wipe dry with Microfiber.' },
    { type: 'step', text: 'All Plastic: Spray Pol Star 1:10 onto a Soft Detail Brush. Lightly agitate and wipe clean with Microfiber. Avoid clear or piano black surfaces; use ONR 1:10 for those areas.' },
    { type: 'step', text: 'Fabric and Leather: Spray Pol Star 1:10. Use a Horse Hair Brush for leather and Soft Brush for fabric. Agitate gently, then wipe with a damp Microfiber Cloth followed by a dry one.' },
    { type: 'step', text: 'All Glass, Mirrors and Screens: Spray Invisible Glass Cleaner on all glass, mirrors, screens and sunroof. Wipe clean with a diamond weave Microfiber Cloth. Complete one at a time and do not let it dry. In direct sunlight, put an old drying towel over glass while working.' },
    { type: 'step', text: 'Plastic Finishing and Protection: Spray Top Star on a Microfiber Sponge and evenly spread across all plastic. Wipe excess off with a Microfiber Cloth.' },
    { type: 'addon', id: 'fabric' },
    { type: 'addon', id: 'leather' },
    { type: 'step', text: 'Final Vacuum: Vacuum any visible debris on the carpets, between seats and trunk as a final pass.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },
    { type: 'step', text: 'Rubber TouchUp: Spray some GUF onto the rubber mats and pedals, buff on with an applicator then wipe excess dry with a Microfiber Cloth.' },
    { type: 'step', text: 'Final Touches: Place an Air Freshener onto the rearview mirror. Place a Plastic Cover onto the steering wheel and shift knob. Fold a microfiber cloth into a pouch and place a business card, 2+ Mints and an Air Freshener Instruction Card. Place the mats back inside and lay a Paper Mat on the driver\'s side floor.' },

    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Interior Check: Inspect all surfaces including seats, carpets, dashboard, doors, trunk, and mats to ensure everything is cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for any remaining dust, debris, streaks, or missed spots and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure no streaks on glass, no residue on plastics, and even finish across all surfaces.' },
    { type: 'step', text: 'Final Touches Check: Confirm air freshener, plastic covers, paper mat, and gift pouch are properly placed.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining imperfections or limitations to communicate honestly with the customer.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and full cabin after completion.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take after photos of previously dirty or problem areas to show improvement.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, and door panels after cleaning.' },
    { type: 'step', text: 'Mats and Setup: Take photos before and after the paper floor mat and plastic covers are in place.' },
    { type: 'step', text: 'Final Presentation: Take clean, well-lit photos highlighting the finished result for marketing and records.' },
    { type: 'step', text: 'Take Videos: Take content of the car after the detail showing: Interior, Wheel, certain debris or stains and anything that got done.' },
  ],

  // ── SILVER EXTERIOR ────────────────────────────────────────────────────────
  'Silver Exterior': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for heavy dirt, brake dust, tar, bug splatter, water spots, oxidation, scratches, or damaged trim and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate limitations such as deep scratches, rock chips, etched water spots, or faded paint/trim that may not be fully correctable.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrade or add-ons such as headlight or trim restoration.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, both sides, and 3/4 angles of the vehicle.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take close-up photos of dirt buildup, brake dust, bugs, tar, scratches, and problem areas.' },
    { type: 'step', text: 'Wheels and Tires: Capture all wheels, tires, and wheel wells before cleaning.' },
    { type: 'step', text: 'Paint Condition: Take photos of paint defects, water spots, oxidation, or contamination.' },
    { type: 'step', text: 'Glass and Trim: Capture windows, mirrors, and trim condition before detailing.' },
    { type: 'step', text: 'Take Videos: Record a full walkaround showing overall condition, problem areas, and anything being addressed.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Wheels, Tires and Wheel Wells' },
    { type: 'step', text: 'Pre-Soak with Cleaner: Spray P&S Brake Buster undiluted (1:0 for heavy buildup, 1:1 for maintenance) onto wheels, tires, and wheel wells. Allow 1–2 minutes dwell without drying.' },
    { type: 'step', text: 'Agitate with Brushes: Use a selection of brushes to scrub the tires, wheel face, spokes, inner barrel, lug nuts, logos, brake calipers. Clean brushes in a bucket of water before moving onto the next wheel or when too dirty.' },
    { type: 'step', text: 'Rinse and Inspect: Rinse all surfaces thoroughly using the pressure washer, ensuring all foam and loosened debris are removed from the wheel face, inner barrel, tire, and wheel well. Inspect the wheel for any remaining brake dust, embedded contamination, or missed areas.' },
    { type: 'step', text: 'Iron Decontamination (If Needed): If brake dust or embedded contamination remains, spray P&S Iron Buster (1:1–1:0 depending on severity) onto the wheel face and inner barrel. Allow 2–4 minutes dwell time. Agitate lightly where needed. Do not allow product to dry.' },
    { type: 'step', text: 'Final Rinse: Rinse all surfaces thoroughly using the pressure washer, ensuring all chemicals and residues are fully removed from wheels, tires, and wheel wells.' },
    { type: 'step', text: 'Drying Wheels: Use a Tornador Gun to blast water out of lug nut holes, barrels, crevices, and brake calipers. Then use a dedicated Drying Towel to dry the face and the rest of the wheel.' },
    { type: 'step', text: 'Tire Dressing: Spray Tire Shine directly on the applicator, go all around and make sure to get where the tireshine meets the rim. Dry excess off with a used Microfiber Cloth.' },

    { type: 'section', title: 'Exterior Washing' },
    { type: 'step', text: 'Pre-Foam: Use 80ml-150ml of CarPro Lift in foam cannon. Allow 2–3 minutes dwell. While dwelling, use a Soft Exterior Detail Brush to clean emblems, trim, and grille areas.' },
    { type: 'step', text: 'Second Rinse: Thoroughly rinse the car from top to bottom, removing all the foam and grime.' },
    { type: 'step', text: 'Contact Wash: Foam vehicle using 100ml of CarPro Reset at 1:10 in foam cannon. Use Two Bucket Method with 60 ml Reset in wash bucket. Use Microfiber Wash Mitts only and avoid brushes on paint.' },
    { type: 'step', text: 'Final Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Drying the Vehicle: Immediately after the final rinse, use a Drying Towel. Dry top to bottom and drag lightly where applicable. Use the Tornador Gun to blow water out of mirrors, trim, emblems, lug nuts, exhaust and the gas cap area. Dry the wheels with a dedicated Drying Towel.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },

    { type: 'addon', id: 'trim' },
    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Exterior Check: Inspect all panels, wheels, glass, trim, and jambs to ensure everything is fully cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for remaining dirt, water spots, streaks, or residue and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure streak-free glass, even tire shine, no water drips, and consistent finish across paint and trim.' },
    { type: 'step', text: 'Final Touches Check: Confirm tires are dressed evenly, no sling, and all crevices (mirrors, emblems, trims) are dry.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining defects such as scratches or etching to communicate honestly.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, sides, and angles after completion.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take after photos of previously dirty or problem areas to highlight improvement.' },
    { type: 'step', text: 'Wheels and Tires: Capture clean wheels, dressed tires, and wheel wells.' },
    { type: 'step', text: 'Paint Finish: Take photos showing gloss, reflections, and overall finish.' },
    { type: 'step', text: 'Final Presentation: Take clean, well-lit photos for marketing and records.' },
    { type: 'step', text: 'Take Videos: Record a final walkaround highlighting shine, cleanliness, and completed work.' },
  ],

  // ── GOLD EXTERIOR ──────────────────────────────────────────────────────────
  'Gold Exterior': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for heavy dirt, brake dust, tar, bug splatter, water spots, oxidation, scratches, or damaged trim and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate limitations such as deep scratches, rock chips, etched water spots, or faded paint/trim that may not be fully correctable.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrade or add-ons such as headlight or trim restoration.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, both sides, and 3/4 angles of the vehicle.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take close-up photos of dirt buildup, brake dust, bugs, tar, scratches, and problem areas.' },
    { type: 'step', text: 'Wheels and Tires: Capture all wheels, tires, and wheel wells before cleaning.' },
    { type: 'step', text: 'Paint Condition: Take photos of paint defects, water spots, oxidation, or contamination.' },
    { type: 'step', text: 'Glass and Trim: Capture windows, mirrors, and trim condition before detailing.' },
    { type: 'step', text: 'Take Videos: Record a full walkaround showing overall condition, problem areas, and anything being addressed.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Wheels, Tires and Wheel Wells' },
    { type: 'step', text: 'Pre-Soak with Cleaner: Spray P&S Brake Buster undiluted (1:0 for heavy buildup, 1:1 for maintenance) onto wheels, tires, and wheel wells. Allow 1–2 minutes dwell without drying.' },
    { type: 'step', text: 'Agitate with Brushes: Use a selection of brushes to scrub the tires, wheel face, spokes, inner barrel, lug nuts, logos, brake calipers. Clean brushes in a bucket of water before moving onto the next wheel or when too dirty.' },
    { type: 'step', text: 'Rinse and Inspect: Rinse all surfaces thoroughly using the pressure washer, ensuring all foam and loosened debris are removed from the wheel face, inner barrel, tire, and wheel well. Inspect the wheel for any remaining brake dust, embedded contamination, or missed areas.' },
    { type: 'step', text: 'Iron Decontamination (If Needed): If brake dust or embedded contamination remains, spray P&S Iron Buster (1:1–1:0 depending on severity) onto the wheel face and inner barrel. Allow 2–4 minutes dwell time. Agitate lightly where needed. Do not allow product to dry.' },
    { type: 'step', text: 'Final Rinse: Rinse all surfaces thoroughly using the pressure washer, ensuring all chemicals and residues are fully removed from wheels, tires, and wheel wells.' },
    { type: 'step', text: 'Drying Wheels: Use a Tornador Gun to blast water out of lug nut holes, barrels, crevices, and brake calipers. Then use a dedicated Drying Towel to dry the face and the rest of the wheel.' },
    { type: 'step', text: 'Tire Dressing: Spray Tire Shine directly on the applicator, go all around and make sure to get where the tireshine meets the rim. Dry excess off with a used Microfiber Cloth.' },
    { type: 'step', text: 'Tire Protection and Shine: Shake and apply a light mist of Griot\'s Ceramic 3-in-1 on the wheel face and buff with a Microfiber Cloth.' },

    { type: 'section', title: 'Exterior Washing' },
    { type: 'step', text: 'Pre-Foam: Use 80ml-150ml of CarPro Lift in foam cannon. Allow 2–3 minutes dwell. While dwelling, use a Soft Exterior Detail Brush to clean emblems, trim, and grille areas.' },
    { type: 'step', text: 'Second Rinse: Thoroughly rinse the car from top to bottom, removing all the foam and grime.' },
    { type: 'step', text: 'Contact Wash: Foam vehicle using 100ml of CarPro Reset at 1:10 in foam cannon. Use Two Bucket Method with 60 ml Reset in wash bucket. Use Microfiber Wash Mitts only and avoid brushes on paint.' },
    { type: 'step', text: 'Clay Bar: Use a Synthetic Clay Towel with the foam and go over all panels. Check for tar or bug splatter and remove with a Microfiber Cloth. Only use a clay towel with a lubricant and do not let the foam dry.' },
    { type: 'step', text: 'Iron Decontamination: Spray P&S Iron Buster undiluted onto paint. Target high rust or rust probable areas including exhaust. Allow 3–5 minutes dwell. Rinse thoroughly.' },
    { type: 'step', text: 'Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Water Spot Removal: Spray White Vinegar 1:1 onto a Microfiber Cloth and wipe glass. For stubborn spots, lightly agitate using 0000 Steel Wool on glass only. Do not allow product to dry, and rinse after each section.' },
    { type: 'step', text: 'Final Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Paint Protection: Shake and apply a light mist of Griot\'s Ceramic 3-in-1 spray directly onto the surface. Work in small areas at a time. Spread product evenly with a new Microfiber Cloth, then flip to a dry side and buff. Avoid getting sealant on glass. Apply to paint, headlights, taillights.' },
    { type: 'step', text: 'Windshield Repellent: Shake and apply a light mist of Ceramic Glass Cleaner spray directly onto the glass and side mirrors. Use a folded dry Diamond Weave cloth and wipe. Flip to a dry side and buff until no oily patches appear.' },
    { type: 'step', text: 'Drying the Vehicle: Immediately after the final rinse, use a Drying Towel. Dry top to bottom and drag lightly where applicable. Use the Tornador Gun to blow water out of mirrors, trim, emblems, lug nuts, exhaust and the gas cap area. Dry the wheels with a dedicated Drying Towel.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },

    { type: 'addon', id: 'trim' },
    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Exterior Check: Inspect all panels, wheels, glass, trim, and jambs to ensure everything is fully cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for remaining dirt, water spots, streaks, or residue and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure streak-free glass, even tire shine, no water drips, and consistent finish across paint and trim.' },
    { type: 'step', text: 'Final Touches Check: Confirm tires are dressed evenly, no sling, and all crevices (mirrors, emblems, trims) are dry.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining defects such as scratches or etching to communicate honestly.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, sides, and angles after completion.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take after photos of previously dirty or problem areas to highlight improvement.' },
    { type: 'step', text: 'Wheels and Tires: Capture clean wheels, dressed tires, and wheel wells.' },
    { type: 'step', text: 'Paint Finish: Take photos showing gloss, reflections, and overall finish.' },
    { type: 'step', text: 'Final Presentation: Take clean, well-lit photos for marketing and records.' },
    { type: 'step', text: 'Take Videos: Record a final walkaround highlighting shine, cleanliness, and completed work.' },
  ],

  // ── SILVER FULL DETAIL ─────────────────────────────────────────────────────
  'Silver Full Detail': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for stains, odors, pet hair, salt buildup, scratches, heavy dirt, brake dust, tar, bug splatter, water spots, oxidation, or damaged trim and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate limitations such as deep scratches, rock chips, etched water spots, faded paint or trim, deep stains, permanent discoloration, or strong odors that may not be fully correctable or removable.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrades or add-ons such as headlight or trim restoration, pet hair removal, stain extraction, odor treatment, or higher tier packages if needed.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, both sides, and 3/4 angles of the vehicle.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take close-up photos of dirt buildup, brake dust, bugs, tar, scratches, and problem areas.' },
    { type: 'step', text: 'Wheels and Tires: Capture all wheels, tires, and wheel wells before cleaning.' },
    { type: 'step', text: 'Paint Condition: Take photos of paint defects, water spots, oxidation, or contamination.' },
    { type: 'step', text: 'Glass and Trim: Capture windows, mirrors, and trim condition before detailing.' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and overall cabin.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take close-up photos of stains, debris, pet hair, salt, or heavily soiled areas.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, door panels, and center console areas.' },
    { type: 'step', text: 'Mats and Trunk: Take photos of floor mats and trunk condition before removal and cleaning.' },
    { type: 'step', text: 'Documentation: Ensure photos clearly show the starting condition for before/after comparison.' },
    { type: 'step', text: 'Take Videos: Record a full walkaround of the vehicle showing the overall condition, including the interior, wheels, and any debris, stains, or problem areas that will be addressed during the detail.' },

    { type: 'section', title: 'Remove All Items and Mats' },
    { type: 'step', text: 'Floor Mats: Remove all floor mats.' },
    { type: 'step', text: 'Items and Garbage: Remove all items and garbage putting them into 2 boxes, one to throw out and one to keep for the customer.' },

    { type: 'section', title: 'Fabric Mats' },
    { type: 'step', text: 'Blow Out Surface: Place the mats in a clean work area and use a Tornador Gun to blow out dirt and dust.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the vacuum over the entire mat even for non-visible debris. If stubborn debris persists, use a stiff brush to agitate or a Tornador Gun again.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Carpet Lines: Lightly mist Pol Star 1:10 and use a Carpet Line Brush to create clean, uniform lines.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'section', title: 'Rubber Mats' },
    { type: 'step', text: 'Use your hands and knock loose debris out of mat.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides.' },
    { type: 'step', text: 'Deep Clean: Spray Green Star APC diluted 1:10 onto rubber mats. Agitate aggressively using a Stiff Drill Brush. Rinse thoroughly with pressure washer.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides to clean off foam and debris.' },
    { type: 'step', text: 'Use a Tornador Gun to dry mat as much as possible.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Wheels, Tires and Wheel Wells' },
    { type: 'step', text: 'Pre-Soak with Cleaner: Spray P&S Brake Buster undiluted (1:0 for heavy buildup, 1:1 for maintenance) onto wheels, tires, and wheel wells. Allow 1–2 minutes dwell without drying.' },
    { type: 'step', text: 'Agitate with Brushes: Use a selection of brushes to scrub the tires, wheel face, spokes, inner barrel, lug nuts, logos, brake calipers. Clean brushes in a bucket of water before moving onto the next wheel or when too dirty.' },
    { type: 'step', text: 'Rinse and Inspect: Rinse all surfaces thoroughly using the pressure washer, ensuring all foam and loosened debris are removed from the wheel face, inner barrel, tire, and wheel well. Inspect the wheel for any remaining brake dust, embedded contamination, or missed areas.' },
    { type: 'step', text: 'Iron Decontamination (If Needed): If brake dust or embedded contamination remains, spray P&S Iron Buster (1:1–1:0 depending on severity) onto the wheel face and inner barrel. Allow 2–4 minutes dwell time. Agitate lightly where needed. Do not allow product to dry.' },
    { type: 'step', text: 'Final Rinse: Rinse all surfaces thoroughly using the pressure washer, ensuring all chemicals and residues are fully removed from wheels, tires, and wheel wells.' },
    { type: 'step', text: 'Drying Wheels: Use a Tornador Gun to blast water out of lug nut holes, barrels, crevices, and brake calipers. Then use a dedicated Drying Towel to dry the face and the rest of the wheel. Once dry, move onto the next wheel.' },
    { type: 'step', text: 'Tire Dressing: Spray Tire Shine directly on the applicator, go all around and make sure to get where the tireshine meets the rim. Dry excess off with a used Microfiber Cloth.' },

    { type: 'section', title: 'Exterior Washing' },
    { type: 'step', text: 'Pre-Foam: Use 80ml-150ml of CarPro Lift in foam cannon. Allow 2–3 minutes dwell. While dwelling, use a Soft Exterior Detail Brush to clean emblems, trim, and grille areas.' },
    { type: 'step', text: 'Second Rinse: Thoroughly rinse the car from top to bottom, removing all the foam and grime.' },
    { type: 'step', text: 'Contact Wash: Foam vehicle using 100ml of CarPro Reset at 1:10 in foam cannon. Use Two Bucket Method with 60 ml Reset in wash bucket. Use Microfiber Wash Mitts only and avoid brushes on paint.' },
    { type: 'step', text: 'Final Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Drying the Vehicle: Immediately after the final rinse, use a Drying Towel. Dry top to bottom and drag lightly where applicable. Use the Tornador Gun to blow water out of mirrors, trim, emblems, lug nuts, exhaust and the gas cap area. Dry the wheels with a dedicated Drying Towel.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },

    { type: 'section', title: 'Interior Detailing' },
    { type: 'step', text: 'Tornador Gun: Use the Tornador Gun on the carpets, seats, console edges and pockets, doors (everything) to loosen all stubborn debris.' },
    { type: 'step', text: 'Pedals: Spray Koch Chemie Green Star 1:10. Agitate using a Stiff Brush to remove dirt and grime. Wipe clean with Microfiber.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the Vacuum on the carpet, seats, console, cup holders, doors, between seats, trunk (everything). Use a Crevice Brush or toothpick to loosen debris. Make sure to move seats back and forth to reach everything, also Vacuum in the seat crevice, seat holes and between the seat and center console. If stubborn debris persists, agitate using a Soft Interior Brush or Crevice Brush depending on the area before vacuuming again.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Door Pockets and Cup Holders: Using distilled water, apply steam to dissolve gunk. Wipe as you steam. Make sure to get the cup, door holders, and crevices.' },
    { type: 'step', text: 'High Contact Areas: Spray Pol Star 1:10 onto a Soft Interior Brush. Agitate surfaces until clean and foamy. For heavily soiled or greasy areas, increase to Pol Star 1:5. Wipe dry with Microfiber.' },
    { type: 'step', text: 'All Plastic: Spray Pol Star 1:10 onto a Soft Detail Brush. Lightly agitate and wipe clean with Microfiber. Avoid clear or piano black surfaces; use ONR 1:10 for those areas.' },
    { type: 'step', text: 'Fabric and Leather: Spray Pol Star 1:10. Use a Horse Hair Brush for leather and Soft Brush for fabric. Agitate gently, then wipe with a damp Microfiber Cloth followed by a dry one.' },
    { type: 'step', text: 'All Glass, Mirrors and Screens: Spray Invisible Glass Cleaner on all glass, mirrors, screens and sunroof. Wipe clean with a diamond weave Microfiber Cloth. Complete one at a time and do not let it dry. In direct sunlight, put an old drying towel over glass while working.' },
    { type: 'addon', id: 'fabric' },
    { type: 'addon', id: 'leather' },
    { type: 'step', text: 'Final Vacuum: Vacuum any visible debris on the carpets, between seats and trunk as a final pass.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },
    { type: 'step', text: 'Rubber TouchUp: Spray some GUF onto the rubber mats and pedals, buff on with an applicator then wipe excess dry with a Microfiber Cloth.' },
    { type: 'step', text: 'Final Touches: Place an Air Freshener onto the rearview mirror. Place a Plastic Cover onto the steering wheel and shift knob. Fold a microfiber cloth into a pouch and place a business card, 2+ Mints and an Air Freshener Instruction Card. Place the mats back inside and lay a Paper Mat on the driver\'s side floor.' },

    { type: 'addon', id: 'trim' },
    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Interior & Exterior Check: Inspect all surfaces including panels, wheels, glass, trim, jambs, seats, carpets, dashboard, doors, trunk, and mats to ensure everything is fully cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for any remaining dirt, dust, debris, streaks, water spots, or residue and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure streak-free glass, no residue on plastics, even tire shine, and a consistent finish across paint, trim, and interior surfaces.' },
    { type: 'step', text: 'Final Touches Check: Confirm tires are dressed evenly with no sling, all crevices (mirrors, emblems, trims) are dry, and air freshener, plastic covers, paper mat, and gift pouch are properly placed.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining defects or limitations such as scratches, etching, or imperfections to communicate honestly with the customer.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, sides, and angles after completion.' },
    { type: 'step', text: 'Detail Exterior Focus Areas: Take after photos of previously dirty or problem areas to highlight improvement.' },
    { type: 'step', text: 'Wheels and Tires: Capture clean wheels, dressed tires, and wheel wells.' },
    { type: 'step', text: 'Paint Finish: Take photos showing gloss, reflections, and overall finish.' },
    { type: 'step', text: 'Final Exterior Presentation: Take clean, well-lit photos for marketing and records.' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and full cabin after completion.' },
    { type: 'step', text: 'Detail Interior Focus Areas: Take after photos of previously dirty or problem areas to show improvement.' },
    { type: 'step', text: 'High Interior Traffic Areas: Capture steering wheel, pedals, cupholders, and door panels after cleaning.' },
    { type: 'step', text: 'Mats and Setup: Take photos before and after the paper floor mat and plastic covers are in place.' },
    { type: 'step', text: 'Final Interior Presentation: Take clean, well-lit photos highlighting the finished result for marketing and records.' },
    { type: 'step', text: 'Take Videos: Record a final walkaround of the vehicle showing the interior, wheels, and overall finish, highlighting cleanliness, shine, and all completed work including previously noted areas.' },
  ],

  // ── GOLD FULL DETAIL ───────────────────────────────────────────────────────
  'Gold Full Detail': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for stains, odors, pet hair, salt buildup, scratches, heavy dirt, brake dust, tar, bug splatter, water spots, oxidation, or damaged trim, and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate limitations such as deep scratches, rock chips, etched water spots, faded paint or trim, deep stains, permanent discoloration, or strong odors that may not be fully correctable or removable.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrades or add-ons such as headlight or trim restoration, pet hair removal, odor treatment, or higher tier packages if needed.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, both sides, and 3/4 angles of the vehicle.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take close-up photos of dirt buildup, brake dust, bugs, tar, scratches, and problem areas.' },
    { type: 'step', text: 'Wheels and Tires: Capture all wheels, tires, and wheel wells before cleaning.' },
    { type: 'step', text: 'Paint Condition: Take photos of paint defects, water spots, oxidation, or contamination.' },
    { type: 'step', text: 'Glass and Trim: Capture windows, mirrors, and trim condition before detailing.' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and overall cabin.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take close-up photos of stains, debris, pet hair, salt, or heavily soiled areas.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, door panels, and center console areas.' },
    { type: 'step', text: 'Mats and Trunk: Take photos of floor mats and trunk condition before removal and cleaning.' },
    { type: 'step', text: 'Documentation: Ensure photos clearly show the starting condition for before/after comparison.' },
    { type: 'step', text: 'Take Videos: Record a full walkaround of the vehicle showing the overall condition, including the interior, wheels, and any debris, stains, or problem areas that will be addressed during the detail.' },

    { type: 'section', title: 'Remove All Items and Mats' },
    { type: 'step', text: 'Floor Mats: Remove all floor mats.' },
    { type: 'step', text: 'Items and Garbage: Remove all items and garbage putting them into 2 boxes, one to throw out and one to keep for the customer.' },

    { type: 'section', title: 'Fabric Mats' },
    { type: 'step', text: 'Blow Out Surface: Place the mats in a clean work area and use a Tornador Gun to blow out dirt and dust.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the vacuum over the entire mat even for non-visible debris. If stubborn debris persists, use a stiff brush to agitate or a Tornador Gun again.' },
    { type: 'step', text: 'Salt Stain Removal: Spray White Vinegar diluted 1:1 directly onto salt stains. Agitate using a Drill Brush (soft) followed by a Stiff Carpet Brush for edges and heavy buildup. Use a Steamer to further break down salt deposits. Extract thoroughly to remove residue and moisture. Follow with Pol Star 1:10 for final cleaning and neutralization.' },
    { type: 'step', text: 'Carpet Stain Removal: Spray P&S Terminator undiluted directly onto stains. Agitate using a Drill Brush (soft). Use a Steamer if needed to break down stubborn stains, then extract fully. Finish with Pol Star 1:10. If staining remains or the area is heavily soiled, use Pol Star 1:5 for a second pass.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Carpet Lines: Lightly mist Pol Star 1:10 and use a Carpet Line Brush to create clean, uniform lines.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'section', title: 'Rubber Mats' },
    { type: 'step', text: 'Use your hands and knock loose debris out of mat.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides.' },
    { type: 'step', text: 'Deep Clean: Spray Green Star APC diluted 1:10 onto rubber mats. Agitate aggressively using a Stiff Drill Brush. Rinse thoroughly with pressure washer.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides to clean off foam and debris.' },
    { type: 'step', text: 'Use a Tornador Gun to dry mat as much as possible.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Wheels, Tires and Wheel Wells' },
    { type: 'step', text: 'Pre-Soak with Cleaner: Spray P&S Brake Buster undiluted (1:0 for heavy buildup, 1:1 for maintenance) onto wheels, tires, and wheel wells. Allow 1–2 minutes dwell without drying.' },
    { type: 'step', text: 'Agitate with Brushes: Use a selection of brushes to scrub the tires, wheel face, spokes, inner barrel, lug nuts, logos, brake calipers. Clean brushes in a bucket of water before moving onto the next wheel or when too dirty.' },
    { type: 'step', text: 'Rinse and Inspect: Rinse all surfaces thoroughly using the pressure washer, ensuring all foam and loosened debris are removed from the wheel face, inner barrel, tire, and wheel well. Inspect the wheel for any remaining brake dust, embedded contamination, or missed areas.' },
    { type: 'step', text: 'Iron Decontamination (If Needed): If brake dust or embedded contamination remains, spray P&S Iron Buster (1:1–1:0 depending on severity) onto the wheel face and inner barrel. Allow 2–4 minutes dwell time. Agitate lightly where needed. Do not allow product to dry.' },
    { type: 'step', text: 'Final Rinse: Rinse all surfaces thoroughly using the pressure washer, ensuring all chemicals and residues are fully removed from wheels, tires, and wheel wells.' },
    { type: 'step', text: 'Drying Wheels: Use a Tornador Gun to blast water out of lug nut holes, barrels, crevices, and brake calipers. Then use a dedicated Drying Towel to dry the face and the rest of the wheel. Once dry, move onto the next wheel.' },
    { type: 'step', text: 'Tire Dressing: Spray Tire Shine directly on the applicator, go all around and make sure to get where the tireshine meets the rim. Dry excess off with a used Microfiber Cloth.' },
    { type: 'step', text: 'Tire Protection and Shine: Shake and apply a light mist of Griot\'s Ceramic 3-in-1 on the wheel face and buff with a Microfiber Cloth.' },

    { type: 'section', title: 'Exterior Washing' },
    { type: 'step', text: 'Pre-Foam: Use 80ml-150ml of CarPro Lift in foam cannon. Allow 2–3 minutes dwell. While dwelling, use a Soft Exterior Detail Brush to clean emblems, trim, and grille areas.' },
    { type: 'step', text: 'Second Rinse: Thoroughly rinse the car from top to bottom, removing all the foam and grime.' },
    { type: 'step', text: 'Contact Wash: Foam vehicle using 100ml of CarPro Reset at 1:10 in foam cannon. Use Two Bucket Method with 60 ml Reset in wash bucket. Use Microfiber Wash Mitts only and avoid brushes on paint.' },
    { type: 'step', text: 'Clay Bar: Use a Synthetic Clay Towel with the foam and go over all panels. Check for tar or bug splatter and remove with a Microfiber Cloth. Only use a clay towel with a lubricant and do not let the foam dry.' },
    { type: 'step', text: 'Iron Decontamination: Spray P&S Iron Buster undiluted onto paint. Target high rust or rust probable areas including exhaust. Allow 3–5 minutes dwell. Rinse thoroughly.' },
    { type: 'step', text: 'Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Water Spot Removal: Spray White Vinegar 1:1 onto a Microfiber Cloth and wipe glass. For stubborn spots, lightly agitate using 0000 Steel Wool on glass only. Do not allow product to dry, and rinse after each section.' },
    { type: 'step', text: 'Final Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Paint Protection: Shake and apply a light mist of Griot\'s Ceramic 3-in-1 spray directly onto the surface. Work in small areas at a time. Spread product evenly with a new Microfiber Cloth, then flip to a dry side and buff. Avoid getting sealant on glass. Apply to paint, headlights, taillights.' },
    { type: 'step', text: 'Windshield Repellent: Shake and apply a light mist of Ceramic Glass Cleaner spray directly onto the glass and side mirrors. Use a folded dry Diamond Weave cloth and wipe. Flip to a dry side and buff until no oily patches appear.' },
    { type: 'step', text: 'Drying the Vehicle: Immediately after the final rinse, use a Drying Towel. Dry top to bottom and drag lightly where applicable. Use the Tornador Gun to blow water out of mirrors, trim, emblems, lug nuts, exhaust and the gas cap area. Dry the wheels with a dedicated Drying Towel.' },

    { type: 'section', title: 'Interior Detailing' },
    { type: 'step', text: 'Tornador Gun: Use the Tornador Gun on the carpets, seats, console edges and pockets, doors (everything) to loosen all stubborn debris.' },
    { type: 'step', text: 'Pedals: Spray Koch Chemie Green Star 1:10. Agitate using a Stiff Brush to remove dirt and grime. Wipe clean with Microfiber.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the Vacuum on the carpet, seats, console, cup holders, doors, between seats, trunk (everything). Use a Crevice Brush or toothpick to loosen debris. Make sure to move seats back and forth to reach everything, also Vacuum in the seat crevice, seat holes and between the seat and center console. If stubborn debris persists, agitate using a Soft Interior Brush or Crevice Brush depending on the area before vacuuming again.' },
    { type: 'step', text: 'Salt Stain Removal: Spray White Vinegar diluted 1:1 directly onto salt stains. Agitate using a Drill Brush (soft) followed by a Stiff Carpet Brush for edges and heavy buildup. Use a Steamer to further break down salt deposits. Extract thoroughly to remove residue and moisture. Follow with Pol Star 1:10 for final cleaning and neutralization.' },
    { type: 'step', text: 'Stain Removal: Spray P&S Terminator undiluted onto stains. Agitate using a Drill Brush (soft). Use a Steamer if needed, then extract thoroughly. Finish with Pol Star 1:10. If stains persist or the area is heavily contaminated, follow with Pol Star 1:5.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Door Pockets and Cup Holders: Using distilled water, apply steam to dissolve gunk. Wipe as you steam. Make sure to get the cup, door holders, and crevices.' },
    { type: 'step', text: 'Sanitation: Using distilled water, apply steam to sanitize high contact surfaces. Wipe as you steam. Make sure to get the steering wheel, shifter, door handle, armrest, etc.' },
    { type: 'step', text: 'High Contact Areas: Spray Pol Star 1:10 onto a Soft Interior Brush. Agitate surfaces until clean and foamy. For heavily soiled or greasy areas, increase to Pol Star 1:5. Wipe dry with Microfiber.' },
    { type: 'step', text: 'All Plastic: Spray Pol Star 1:10 onto a Soft Detail Brush. Lightly agitate and wipe clean with Microfiber. Avoid clear or piano black surfaces; use ONR 1:10 for those areas.' },
    { type: 'step', text: 'Fabric and Leather: Spray Pol Star 1:10. Use a Horse Hair Brush for leather and Soft Brush for fabric. Agitate gently, then wipe with a damp Microfiber Cloth followed by a dry one.' },
    { type: 'step', text: 'All Glass, Mirrors and Screens: Spray Invisible Glass Cleaner on all glass, mirrors, screens and sunroof. Wipe clean with a diamond weave Microfiber Cloth. Complete one at a time and do not let it dry. In direct sunlight, put an old drying towel over glass while working.' },
    { type: 'step', text: 'Plastic Finishing and Protection: Spray Top Star on a Microfiber Sponge and evenly spread across all plastic. Wipe excess off with a Microfiber Cloth.' },
    { type: 'addon', id: 'fabric' },
    { type: 'addon', id: 'leather' },
    { type: 'step', text: 'Final Vacuum: Vacuum any visible debris on the carpets, between seats and trunk as a final pass.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },
    { type: 'step', text: 'Rubber TouchUp: Spray some GUF onto the rubber mats and pedals, buff on with an applicator then wipe excess dry with a Microfiber Cloth.' },
    { type: 'step', text: 'Final Touches: Place an Air Freshener onto the rearview mirror. Place a Plastic Cover onto the steering wheel and shift knob. Fold a microfiber cloth into a pouch and place a business card, 2+ Mints and an Air Freshener Instruction Card. Place the mats back inside and lay a Paper Mat on the driver\'s side floor.' },

    { type: 'addon', id: 'trim' },
    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Interior & Exterior Check: Inspect all surfaces including panels, wheels, glass, trim, jambs, seats, carpets, dashboard, doors, trunk, and mats to ensure everything is fully cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for any remaining dirt, dust, debris, streaks, water spots, or residue and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure streak-free glass, no residue on plastics, even tire shine, and a consistent finish across paint, trim, and interior surfaces.' },
    { type: 'step', text: 'Final Touches Check: Confirm tires are dressed evenly with no sling, all crevices (mirrors, emblems, trims) are dry, and air freshener, plastic covers, paper mat, and gift pouch are properly placed.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining defects or limitations such as scratches, etching, or imperfections to communicate honestly with the customer.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, sides, and angles after completion.' },
    { type: 'step', text: 'Detail Exterior Focus Areas: Take after photos of previously dirty or problem areas to highlight improvement.' },
    { type: 'step', text: 'Wheels and Tires: Capture clean wheels, dressed tires, and wheel wells.' },
    { type: 'step', text: 'Paint Finish: Take photos showing gloss, reflections, and overall finish.' },
    { type: 'step', text: 'Final Exterior Presentation: Take clean, well-lit photos for marketing and records.' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and full cabin after completion.' },
    { type: 'step', text: 'Detail Interior Focus Areas: Take after photos of previously dirty or problem areas to show improvement.' },
    { type: 'step', text: 'High Interior Traffic Areas: Capture steering wheel, pedals, cupholders, and door panels after cleaning.' },
    { type: 'step', text: 'Mats and Setup: Take photos before and after the paper floor mat and plastic covers are in place.' },
    { type: 'step', text: 'Final Interior Presentation: Take clean, well-lit photos highlighting the finished result for marketing and records.' },
    { type: 'step', text: 'Take Videos: Record a final walkaround of the vehicle showing the interior, wheels, and overall finish, highlighting cleanliness, shine, and all completed work including previously noted areas.' },
  ],

  // ── PLATINUM FULL DETAIL ───────────────────────────────────────────────────
  'Platinum Full Detail': [
    { type: 'section', title: 'Pre-Detail Inspection & Checklist' },
    { type: 'step', text: 'Customer Walkaround: Walk around the vehicle with the customer (if present) and ask about any concerns, problem areas, or specific requests.' },
    { type: 'step', text: 'Identify Problem Areas: Check for stains, odors, pet hair, salt buildup, scratches, heavy dirt, brake dust, tar, bug splatter, water spots, oxidation, or damaged trim, and note anything that may need extra attention or add-ons.' },
    { type: 'step', text: 'Set Expectations: Clearly communicate limitations such as deep scratches, rock chips, etched water spots, faded paint or trim, deep stains, permanent discoloration, or strong odors that may not be fully correctable or removable.' },
    { type: 'step', text: 'Recommend Services: Suggest upgrades or add-ons such as headlight or trim restoration, pet hair removal, odor treatment, or higher tier packages if needed.' },

    { type: 'section', title: 'Pre-Detail Photos and Videos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, both sides, and 3/4 angles of the vehicle.' },
    { type: 'step', text: 'Exterior Detail Focus Areas: Take close-up photos of dirt buildup, brake dust, bugs, tar, scratches, and problem areas.' },
    { type: 'step', text: 'Wheels and Tires: Capture all wheels, tires, and wheel wells before cleaning.' },
    { type: 'step', text: 'Paint Condition: Take photos of paint defects, water spots, oxidation, or contamination.' },
    { type: 'step', text: 'Glass and Trim: Capture windows, mirrors, and trim condition before detailing.' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and overall cabin.' },
    { type: 'step', text: 'Interior Detail Focus Areas: Take close-up photos of stains, debris, pet hair, salt, or heavily soiled areas.' },
    { type: 'step', text: 'High Traffic Areas: Capture steering wheel, pedals, cupholders, door panels, and center console areas.' },
    { type: 'step', text: 'Mats and Trunk: Take photos of floor mats and trunk condition before removal and cleaning.' },
    { type: 'step', text: 'Documentation: Ensure photos clearly show the starting condition for before/after comparison.' },
    { type: 'step', text: 'Take Videos: Record a full walkaround of the vehicle showing the overall condition, including the interior, wheels, and any debris, stains, or problem areas that will be addressed during the detail.' },

    { type: 'section', title: 'Remove All Items and Mats' },
    { type: 'step', text: 'Floor Mats: Remove all floor mats.' },
    { type: 'step', text: 'Items and Garbage: Remove all items and garbage putting them into 2 boxes, one to throw out and one to keep for the customer.' },

    { type: 'section', title: 'Fabric Mats' },
    { type: 'step', text: 'Blow Out Surface: Place the mats in a clean work area and use a Tornador Gun to blow out dirt and dust.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the vacuum over the entire mat even for non-visible debris. If stubborn debris persists, use a stiff brush to agitate or a Tornador Gun again.' },
    { type: 'step', text: 'Salt Stain Removal: Spray White Vinegar diluted 1:1 directly onto salt stains. Agitate using a Drill Brush (soft) followed by a Stiff Carpet Brush for edges and heavy buildup. Use a Steamer to further break down salt deposits. Extract thoroughly to remove residue and moisture. Follow with Pol Star 1:10 for final cleaning and neutralization.' },
    { type: 'step', text: 'Carpet Stain Removal: Spray P&S Terminator undiluted directly onto stains. Agitate using a Drill Brush (soft). Use a Steamer if needed to break down stubborn stains, then extract fully. Finish with Pol Star 1:10. If staining remains or the area is heavily soiled, use Pol Star 1:5 for a second pass.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Carpet Lines: Lightly mist Pol Star 1:10 and use a Carpet Line Brush to create clean, uniform lines.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'section', title: 'Rubber Mats' },
    { type: 'step', text: 'Use your hands and knock loose debris out of mat.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides.' },
    { type: 'step', text: 'Deep Clean: Spray Green Star APC diluted 1:10 onto rubber mats. Agitate aggressively using a Stiff Drill Brush. Rinse thoroughly with pressure washer.' },
    { type: 'step', text: 'Use a Pressure Washer on both sides to clean off foam and debris.' },
    { type: 'step', text: 'Use a Tornador Gun to dry mat as much as possible.' },
    { type: 'step', text: 'Air Dry: Allow the mats to air dry completely.' },

    { type: 'addon', id: 'engine' },
    { type: 'addon', id: 'sticker' },

    { type: 'section', title: 'Wheels, Tires and Wheel Wells' },
    { type: 'step', text: 'Pre-Soak with Cleaner: Spray P&S Brake Buster undiluted (1:0 for heavy buildup, 1:1 for maintenance) onto wheels, tires, and wheel wells. Allow 1–2 minutes dwell without drying.' },
    { type: 'step', text: 'Agitate with Brushes: Use a selection of brushes to scrub the tires, wheel face, spokes, inner barrel, lug nuts, logos, brake calipers. Clean brushes in a bucket of water before moving onto the next wheel or when too dirty.' },
    { type: 'step', text: 'Rinse and Inspect: Rinse all surfaces thoroughly using the pressure washer, ensuring all foam and loosened debris are removed from the wheel face, inner barrel, tire, and wheel well. Inspect the wheel for any remaining brake dust, embedded contamination, or missed areas.' },
    { type: 'step', text: 'Iron Decontamination (If Needed): If brake dust or embedded contamination remains, spray P&S Iron Buster (1:1–1:0 depending on severity) onto the wheel face and inner barrel. Allow 2–4 minutes dwell time. Agitate lightly where needed. Do not allow product to dry.' },
    { type: 'step', text: 'Final Rinse: Rinse all surfaces thoroughly using the pressure washer, ensuring all chemicals and residues are fully removed from wheels, tires, and wheel wells.' },
    { type: 'step', text: 'Drying Wheels: Use a Tornador Gun to blast water out of lug nut holes, barrels, crevices, and brake calipers. Then use a dedicated Drying Towel to dry the face and the rest of the wheel. Once dry, move onto the next wheel.' },
    { type: 'step', text: 'Tire Dressing: Spray Tire Shine directly on the applicator, go all around and make sure to get where the tireshine meets the rim. Dry excess off with a used Microfiber Cloth.' },
    { type: 'step', text: 'Tire Protection and Shine: Shake and apply a light mist of Griot\'s Ceramic 3-in-1 on the wheel face and buff with a Microfiber Cloth.' },

    { type: 'section', title: 'Exterior Washing' },
    { type: 'step', text: 'Pre-Foam: Use 80ml-150ml of CarPro Lift in foam cannon. Allow 2–3 minutes dwell. While dwelling, use a Soft Exterior Detail Brush to clean emblems, trim, and grille areas.' },
    { type: 'step', text: 'Second Rinse: Thoroughly rinse the car from top to bottom, removing all the foam and grime.' },
    { type: 'step', text: 'Contact Wash: Foam vehicle using 100ml of CarPro Reset at 1:10 in foam cannon. Use Two Bucket Method with 60 ml Reset in wash bucket. Use Microfiber Wash Mitts only and avoid brushes on paint.' },
    { type: 'step', text: 'Clay Bar: Use a Synthetic Clay Towel with the foam and go over all panels. Check for tar or bug splatter and remove with a Microfiber Cloth. Only use a clay towel with a lubricant and do not let the foam dry.' },
    { type: 'step', text: 'Iron Decontamination: Spray P&S Iron Buster undiluted onto paint. Target high rust or rust probable areas including exhaust. Allow 3–5 minutes dwell. Rinse thoroughly.' },
    { type: 'step', text: 'Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Water Spot Removal: Spray White Vinegar 1:1 onto a Microfiber Cloth and wipe glass. For stubborn spots, lightly agitate using 0000 Steel Wool on glass only. Do not allow product to dry, and rinse after each section.' },
    { type: 'step', text: 'Final Rinse: Use the Pressure Washer, rinse the entire car starting at the roof and work down. Rinse in and under the side mirrors, door handles, gas cap, panel gaps, and other hidden spots.' },
    { type: 'step', text: 'Paint Protection: Shake and apply a light mist of Griot\'s Ceramic 3-in-1 spray directly onto the surface. Work in small areas at a time. Spread product evenly with a new Microfiber Cloth, then flip to a dry side and buff. Avoid getting sealant on glass. Apply to paint, headlights, taillights.' },
    { type: 'step', text: 'Windshield Repellent: Shake and apply a light mist of Ceramic Glass Cleaner spray directly onto the glass and side mirrors. Use a folded dry Diamond Weave cloth and wipe. Flip to a dry side and buff until no oily patches appear.' },
    { type: 'step', text: 'Drying the Vehicle: Immediately after the final rinse, use a Drying Towel. Dry top to bottom and drag lightly where applicable. Use the Tornador Gun to blow water out of mirrors, trim, emblems, lug nuts, exhaust and the gas cap area. Dry the wheels with a dedicated Drying Towel.' },

    { type: 'section', title: 'Interior Detailing' },
    { type: 'step', text: 'Tornador Gun: Use the Tornador Gun on the carpets, seats, console edges and pockets, doors (everything) to loosen all stubborn debris.' },
    { type: 'step', text: 'Pedals: Spray Koch Chemie Green Star 1:10. Agitate using a Stiff Brush to remove dirt and grime. Wipe clean with Microfiber.' },
    { type: 'step', text: 'Loosen Fibers: Spray Koch Chemie Pol Star diluted 1:10 evenly across the carpet. For heavily soiled or matted carpets, increase dilution to 1:5. Use a Stiff Interior Brush to work the product into the fibers and loosen embedded dirt and hair.' },
    { type: 'step', text: 'Vacuum: Use the Vacuum on the carpet, seats, console, cup holders, doors, between seats, trunk (everything). Use a Crevice Brush or toothpick to loosen debris. Make sure to move seats back and forth to reach everything, also Vacuum in the seat crevice, seat holes and between the seat and center console. If stubborn debris persists, agitate using a Soft Interior Brush or Crevice Brush depending on the area before vacuuming again.' },
    { type: 'step', text: 'Salt Stain Removal: Spray White Vinegar diluted 1:1 directly onto salt stains. Agitate using a Drill Brush (soft) followed by a Stiff Carpet Brush for edges and heavy buildup. Use a Steamer to further break down salt deposits. Extract thoroughly to remove residue and moisture. Follow with Pol Star 1:10 for final cleaning and neutralization.' },
    { type: 'step', text: 'Stain Removal: Spray P&S Terminator undiluted onto stains. Agitate using a Drill Brush (soft). Use a Steamer if needed, then extract thoroughly. Finish with Pol Star 1:10. If stains persist or the area is heavily contaminated, follow with Pol Star 1:5.' },
    { type: 'addon', id: 'pethair' },
    { type: 'step', text: 'Door Pockets and Cup Holders: Using distilled water, apply steam to dissolve gunk. Wipe as you steam. Make sure to get the cup, door holders, and crevices.' },
    { type: 'step', text: 'Sanitation: Using distilled water, apply steam to sanitize high contact surfaces. Wipe as you steam. Make sure to get the steering wheel, shifter, door handle, armrest, etc.' },
    { type: 'step', text: 'High Contact Areas: Spray Pol Star 1:10 onto a Soft Interior Brush. Agitate surfaces until clean and foamy. For heavily soiled or greasy areas, increase to Pol Star 1:5. Wipe dry with Microfiber.' },
    { type: 'step', text: 'All Plastic: Spray Pol Star 1:10 onto a Soft Detail Brush. Lightly agitate and wipe clean with Microfiber. Avoid clear or piano black surfaces; use ONR 1:10 for those areas.' },
    { type: 'step', text: 'Fabric and Leather: Spray Pol Star 1:10. Use a Horse Hair Brush for leather and Soft Brush for fabric. Agitate gently, then wipe with a damp Microfiber Cloth followed by a dry one.' },
    { type: 'step', text: 'All Glass, Mirrors and Screens: Spray Invisible Glass Cleaner on all glass, mirrors, screens and sunroof. Wipe clean with a diamond weave Microfiber Cloth. Complete one at a time and do not let it dry. In direct sunlight, put an old drying towel over glass while working.' },
    { type: 'step', text: 'Plastic Finishing and Protection: Spray Top Star on a Microfiber Sponge and evenly spread across all plastic. Wipe excess off with a Microfiber Cloth.' },
    { type: 'addon', id: 'fabric' },
    { type: 'addon', id: 'leather' },
    { type: 'step', text: 'Final Vacuum: Vacuum any visible debris on the carpets, between seats and trunk as a final pass.' },
    { type: 'step', text: 'Cleaning Jambs: Spray ONR at 1:10 dilution. Use a Soft Detail Brush for hinges, edges, and tight areas. Wipe clean and dry with Microfiber.' },
    { type: 'step', text: 'Rubber TouchUp: Spray some GUF onto the rubber mats and pedals, buff on with an applicator then wipe excess dry with a Microfiber Cloth.' },
    { type: 'step', text: 'Final Touches: Place an Air Freshener onto the rearview mirror. Place a Plastic Cover onto the steering wheel and shift knob. Fold a microfiber cloth into a pouch and place a business card, 2+ Mints and an Air Freshener Instruction Card. Place the mats back inside and lay a Paper Mat on the driver\'s side floor.' },

    { type: 'addon', id: 'trim' },
    { type: 'addon', id: 'headlight' },

    { type: 'section', title: 'Post-Detail Inspection & Checklist' },
    { type: 'step', text: 'Full Interior & Exterior Check: Inspect all surfaces including panels, wheels, glass, trim, jambs, seats, carpets, dashboard, doors, trunk, and mats to ensure everything is fully cleaned.' },
    { type: 'step', text: 'Missed Areas: Look for any remaining dirt, dust, debris, streaks, water spots, or residue and correct immediately.' },
    { type: 'step', text: 'Finishing Quality: Ensure streak-free glass, no residue on plastics, even tire shine, and a consistent finish across paint, trim, and interior surfaces.' },
    { type: 'step', text: 'Final Touches Check: Confirm tires are dressed evenly with no sling, all crevices (mirrors, emblems, trims) are dry, and air freshener, plastic covers, paper mat, and gift pouch are properly placed.' },
    { type: 'step', text: 'Customer Notes: Take note of any remaining defects or limitations such as scratches, etching, or imperfections to communicate honestly with the customer.' },

    { type: 'section', title: 'Post-Detail Photos' },
    { type: 'step', text: 'Full Exterior Shots: Take wide photos of front, rear, sides, and angles after completion.' },
    { type: 'step', text: 'Detail Exterior Focus Areas: Take after photos of previously dirty or problem areas to highlight improvement.' },
    { type: 'step', text: 'Wheels and Tires: Capture clean wheels, dressed tires, and wheel wells.' },
    { type: 'step', text: 'Paint Finish: Take photos showing gloss, reflections, and overall finish.' },
    { type: 'step', text: 'Final Exterior Presentation: Take clean, well-lit photos for marketing and records.' },
    { type: 'step', text: 'Full Interior Shots: Take wide photos of front seats, rear seats, dashboard, trunk, and full cabin after completion.' },
    { type: 'step', text: 'Detail Interior Focus Areas: Take after photos of previously dirty or problem areas to show improvement.' },
    { type: 'step', text: 'High Interior Traffic Areas: Capture steering wheel, pedals, cupholders, and door panels after cleaning.' },
    { type: 'step', text: 'Mats and Setup: Take photos before and after the paper floor mat and plastic covers are in place.' },
    { type: 'step', text: 'Final Interior Presentation: Take clean, well-lit photos highlighting the finished result for marketing and records.' },
    { type: 'step', text: 'Take Videos: Record a final walkaround of the vehicle showing the interior, wheels, and overall finish, highlighting cleanliness, shine, and all completed work including previously noted areas.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedAddons, setSelectedAddons] = useState([])
  const [checkedSteps, setCheckedSteps] = useState({})
  const [collapsedSections, setCollapsedSections] = useState(new Set())
  const [collapsedAddons, setCollapsedAddons] = useState(new Set())
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const rules = selectedPackage ? PACKAGE_RULES[selectedPackage] : null

  function selectPackage(pkg) { setSelectedPackage(pkg); setSelectedAddons([]); setCheckedSteps({}); setCollapsedSections(new Set()); setCollapsedAddons(new Set()) }
  function toggleAddon(id) {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }
  function toggleStep(key) {
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }))
  }
  function toggleSectionCollapse(key) {
    setCollapsedSections(prev => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next })
  }
  function toggleAddonCollapse(key) {
    setCollapsedAddons(prev => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next })
  }
  function reset() { setSelectedPackage(null); setSelectedAddons([]); setCheckedSteps({}); setCollapsedSections(new Set()); setCollapsedAddons(new Set()) }
  function copySummary() {
    const included = rules ? rules.included.map(id => ADDONS.find(a => a.id === id)?.title) : []
    const selected = selectedAddons.map(id => ADDONS.find(a => a.id === id)?.title)
    const lines = [
      `Package: ${selectedPackage || 'None'}`,
      included.length ? `Included Add-ons: ${included.join(', ')}` : null,
      selected.length ? `Selected Add-ons: ${selected.join(', ')}` : null,
    ].filter(Boolean)
    navigator.clipboard.writeText(lines.join('\n'))
  }

  const activeAddonIds = rules ? [...rules.included, ...selectedAddons] : []

  function buildStepsSequence() {
    const pkgSteps = PACKAGE_STEPS[selectedPackage]
    if (!pkgSteps) return null
    const sections = []
    let current = null
    let sectionStepNum = 0
    // These addons get their own top-level collapsible section
    const STANDALONE_ADDONS = ['engine', 'sticker', 'trim', 'headlight']

    const ensureSection = () => {
      if (!current) { current = { title: '', key: `sec-${sections.length}`, items: [] }; sections.push(current) }
    }

    pkgSteps.forEach((item, rawIdx) => {
      if (item.type === 'section') {
        sectionStepNum = 0
        current = { title: item.title, key: `sec-${sections.length}`, items: [] }
        sections.push(current)
      } else if (item.type === 'step') {
        ensureSection()
        sectionStepNum++
        current.items.push({ kind: 'step', number: sectionStepNum, text: item.text, stepKey: `pkg-${rawIdx}` })
      } else if (item.type === 'addon') {
        if (!activeAddonIds.includes(item.id)) return
        const addon = ADDONS.find(a => a.id === item.id)
        const rawSteps = ADDON_STEPS[item.id] || null
        const addonKey = `addon-${item.id}-${rawIdx}`
        const isIncluded = rules.included.includes(item.id)

        if (STANDALONE_ADDONS.includes(item.id)) {
          // Own top-level collapsible section with fresh step numbering
          const stepsWithKeys = rawSteps ? rawSteps.map((text, i) => ({
            kind: 'step', text, stepKey: `${addonKey}-${i}`, number: i + 1
          })) : []
          current = null // force next regular step/section to create a fresh section
          sections.push({ title: addon.title, key: addonKey, items: stepsWithKeys, isAddon: true, isIncluded })
        } else {
          // Inline within current section (pethair, fabric, leather - single steps)
          ensureSection()
          const stepsWithKeys = rawSteps ? rawSteps.map((text, i) => {
            sectionStepNum++
            return { text, stepKey: `${addonKey}-${i}`, number: sectionStepNum }
          }) : null
          current.items.push({ kind: 'addon-block', addon, steps: stepsWithKeys, isIncluded, addonKey })
        }
      }
    })

    return sections
  }

  const stepsSequence = selectedPackage ? buildStepsSequence() : null

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(212,160,23,0.2)' }}>
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png?v=4" className="h-10 w-auto" alt="Zenith" />
            <div>
              <p className="text-yellow-400/60 text-xs tracking-[0.3em] uppercase">Internal Use Only</p>
              <h1 className="font-display font-bold text-xl text-white">Admin Panel</h1>
            </div>
          </div>
          <div className="flex gap-3">
<button onClick={reset}
              className="px-4 py-2 text-xs tracking-widest uppercase font-bold rounded-sm transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Summary */}
        {selectedPackage && (
          <div className="p-5 rounded-sm" style={{ background: 'rgba(212,160,23,0.04)', border: '1px solid rgba(212,160,23,0.2)' }}>
            <p className="text-yellow-400/60 text-xs tracking-widest uppercase mb-3 font-semibold">Current Selection</p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-black" style={{ background: 'linear-gradient(135deg, #d4a017, #f0c945)' }}>{selectedPackage}</span>
              {rules?.included.map(id => { const a = ADDONS.find(x => x.id === id); return (
                <span key={id} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ border: '1px solid rgba(212,160,23,0.5)', color: '#d4a017' }}>{a?.title} <span className="opacity-60">· Included</span></span>
              )})}
              {selectedAddons.map(id => { const a = ADDONS.find(x => x.id === id); return (
                <span key={id} className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>{a?.title}</span>
              )})}
            </div>
          </div>
        )}

        {/* Section 1: Package */}
        <div>
          <SectionLabel number="1" label="Select Package" />
          <div className="flex flex-wrap gap-3 mt-4">
            {PACKAGES.map(pkg => {
              const active = selectedPackage === pkg
              return (
                <button key={pkg} onClick={() => selectPackage(pkg)}
                  className="px-5 py-3 rounded-sm text-sm font-semibold tracking-wide transition-all duration-200"
                  style={active ? { background: 'linear-gradient(135deg, #d4a017, #f0c945)', color: '#000', boxShadow: '0 0 20px rgba(212,160,23,0.4)', border: '1px solid transparent' }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,160,23,0.25)', color: 'rgba(255,255,255,0.6)' }}>
                  {pkg}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section 2: Add-ons */}
        {selectedPackage && (
          <div>
            <SectionLabel number="2" label="Add-Ons" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {ADDONS.map(addon => {
                const isIncluded = rules.included.includes(addon.id)
                const isSelectable = rules.selectable.includes(addon.id)
                const isSelected = selectedAddons.includes(addon.id)
                if (!isIncluded && !isSelectable) return null
                return (
                  <button key={addon.id} onClick={() => isSelectable && toggleAddon(addon.id)} disabled={isIncluded}
                    className="text-left p-5 rounded-sm transition-all duration-200 relative"
                    style={isIncluded ? { background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.4)', cursor: 'default' }
                      : isSelected ? { background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.7)', boxShadow: '0 0 20px rgba(212,160,23,0.12)' }
                      : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {isIncluded && (
                      <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full text-black" style={{ background: 'linear-gradient(135deg, #d4a017, #f0c945)' }}>Included</span>
                    )}
                    {isSelected && !isIncluded && (
                      <span className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#d4a017' }}>
                        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    )}
                    <p className={`text-sm font-semibold pr-16 leading-snug mb-1 ${isIncluded ? 'text-yellow-400/80' : isSelected ? 'text-white' : 'text-white/60'}`}>{addon.title}</p>
                    <p className="text-xs font-bold" style={{ color: isIncluded ? 'rgba(212,160,23,0.5)' : 'rgba(212,160,23,0.6)' }}>{isIncluded ? 'No extra charge' : addon.price}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Section 3: Steps */}
        {selectedPackage && (
          <div>
            <SectionLabel number="3" label="Steps" />
            <div className="mt-4 space-y-2">
              {stepsSequence === null ? (
                <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(212,160,23,0.15)' }}>
                  <div className="px-6 py-4" style={{ background: 'rgba(212,160,23,0.05)', borderBottom: '1px solid rgba(212,160,23,0.1)' }}>
                    <p className="text-yellow-400/60 text-xs tracking-widest uppercase font-bold">{selectedPackage} - Steps</p>
                  </div>
                  <div className="p-6 space-y-3">
                    <PlaceholderCard text={`[${selectedPackage} step content goes here]`} />
                    {activeAddonIds.map(id => {
                      const addon = ADDONS.find(a => a.id === id)
                      return <PlaceholderCard key={id} text={`[${addon?.title} step content goes here]`} isAddon isIncluded={rules.included.includes(id)} />
                    })}
                  </div>
                </div>
              ) : (
                stepsSequence.map(section => (
                  <SectionGroup
                    key={section.key}
                    section={section}
                    collapsed={collapsedSections.has(section.key)}
                    onToggleCollapse={() => toggleSectionCollapse(section.key)}
                    checkedSteps={checkedSteps}
                    onToggleStep={toggleStep}
                    collapsedAddons={collapsedAddons}
                    onToggleAddon={toggleAddonCollapse}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {!selectedPackage && (
          <div className="text-center py-20">
            <p className="text-white/20 text-sm tracking-widest uppercase">Select a package to begin</p>
          </div>
        )}
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 z-50"
        style={{
          background: 'linear-gradient(135deg, #d4a017, #f0c945)',
          boxShadow: '0 4px 20px rgba(212,160,23,0.4)',
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transform: showScrollTop ? 'translateY(0)' : 'translateY(12px)',
        }}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 12 12" className="w-4 h-4" fill="none">
          <path d="M2 8l4-4 4 4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style={{ background: 'linear-gradient(135deg, #d4a017, #f0c945)' }}>{number}</span>
      <span className="text-white/80 text-sm tracking-widest uppercase font-semibold">{label}</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.15)' }} />
    </div>
  )
}

function SectionGroup({ section, collapsed, onToggleCollapse, checkedSteps, onToggleStep, collapsedAddons, onToggleAddon }) {
  // Count unchecked steps in this section
  let unchecked = 0
  let total = 0
  section.items.forEach(item => {
    if (item.kind === 'step') { total++; if (!checkedSteps[item.stepKey]) unchecked++ }
    else if (item.kind === 'addon-block' && item.steps) {
      item.steps.forEach(s => { total++; if (!checkedSteps[s.stepKey]) unchecked++ })
    }
  })
  const allDone = total > 0 && unchecked === 0

  if (section.isAddon) {
    // Standalone addon - rendered like an AddonStepBlock at top level
    return (
      <div className="rounded-sm my-1" style={{ border: '1px solid rgba(212,160,23,0.25)' }}>
        <button onClick={onToggleCollapse} className="w-full px-5 py-3 flex items-center gap-3 text-left" style={{ background: 'rgba(212,160,23,0.07)', borderBottom: collapsed ? 'none' : '1px solid rgba(212,160,23,0.15)' }}>
          <svg className="w-3 h-3 flex-shrink-0 transition-transform duration-200" style={{ color: allDone ? 'rgba(255,255,255,0.2)' : '#d4a017', transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className={`text-xs tracking-widest uppercase font-bold flex-1 transition-colors duration-200 ${allDone ? 'text-white/25' : 'text-yellow-400/80'}`}>{section.title}</p>
          {section.isIncluded && (
            <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full text-black" style={{ background: 'linear-gradient(135deg, #d4a017, #f0c945)' }}>Included</span>
          )}
          {unchecked > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,160,23,0.18)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.35)' }}>{unchecked} left</span>
          )}
          {allDone && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Done
            </span>
          )}
        </button>
        {!collapsed && (
          <div className="p-4 space-y-2">
            {section.items.map((item, i) => (
              <StepCard key={i} stepKey={item.stepKey} number={item.number} text={item.text} checked={!!checkedSteps[item.stepKey]} onToggle={onToggleStep} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {section.title ? (
        <button onClick={onToggleCollapse} className="w-full flex items-center gap-3 pt-4 pb-1 text-left group">
          <svg className="w-3 h-3 flex-shrink-0 transition-transform duration-200" style={{ color: allDone ? 'rgba(255,255,255,0.2)' : '#d4a017', transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className={`text-xs tracking-widest uppercase font-bold transition-colors duration-200 ${allDone ? 'text-white/25' : 'text-yellow-400/70'}`}>{section.title}</p>
          <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.1)' }} />
          {unchecked > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(212,160,23,0.18)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.35)' }}>
              {unchecked} left
            </span>
          )}
          {allDone && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Done
            </span>
          )}
        </button>
      ) : null}
      {!collapsed && (
        <div className="space-y-2 mt-1">
          {section.items.map((item, i) => {
            if (item.kind === 'step') return (
              <StepCard key={i} stepKey={item.stepKey} number={item.number} text={item.text} checked={!!checkedSteps[item.stepKey]} onToggle={onToggleStep} />
            )
            if (item.kind === 'addon-block') return (
              <AddonStepBlock key={i} addonKey={item.addonKey} addon={item.addon} steps={item.steps} isIncluded={item.isIncluded}
                collapsed={collapsedAddons.has(item.addonKey)} onToggleCollapse={() => onToggleAddon(item.addonKey)}
                checkedSteps={checkedSteps} onToggle={onToggleStep} />
            )
            return null
          })}
        </div>
      )}
    </div>
  )
}

function StepCard({ number, text, stepKey, checked, onToggle }) {
  return (
    <div
      onClick={() => onToggle && onToggle(stepKey)}
      className="flex gap-4 items-start p-4 rounded-sm cursor-pointer select-none transition-all duration-200"
      style={{
        background: checked ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${checked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)'}`,
        opacity: checked ? 0.4 : 1,
      }}
    >
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition-all duration-200"
        style={{ background: checked ? 'rgba(255,255,255,0.15)' : 'rgba(212,160,23,0.7)', color: checked ? 'rgba(255,255,255,0.5)' : '#000' }}>
        {checked
          ? <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : number}
      </span>
      <p className={`text-sm leading-relaxed transition-all duration-200 ${checked ? 'line-through text-white/30' : 'text-white/70'}`}>{text}</p>
    </div>
  )
}

function AddonStepBlock({ addonKey, addon, steps, isIncluded, collapsed, onToggleCollapse, checkedSteps, onToggle }) {
  let unchecked = 0
  let total = 0
  if (steps) steps.forEach(s => { total++; if (!checkedSteps[s.stepKey]) unchecked++ })
  const allDone = total > 0 && unchecked === 0

  return (
    <div className="rounded-sm my-2" style={{ border: '1px solid rgba(212,160,23,0.25)' }}>
      <button onClick={onToggleCollapse} className="w-full px-5 py-3 flex items-center gap-3 text-left" style={{ background: 'rgba(212,160,23,0.07)', borderBottom: collapsed ? 'none' : '1px solid rgba(212,160,23,0.15)' }}>
        <svg className="w-3 h-3 flex-shrink-0 transition-transform duration-200" style={{ color: allDone ? 'rgba(255,255,255,0.2)' : '#d4a017', transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }} viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className={`text-xs tracking-widest uppercase font-bold flex-1 ${allDone ? 'text-white/25' : 'text-yellow-400/80'}`}>{addon?.title}</p>
        {isIncluded && (
          <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full text-black" style={{ background: 'linear-gradient(135deg, #d4a017, #f0c945)' }}>Included</span>
        )}
        {unchecked > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,160,23,0.18)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.35)' }}>
            {unchecked} left
          </span>
        )}
        {allDone && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Done
          </span>
        )}
      </button>
      {!collapsed && (
        <div className="p-4 space-y-2">
          {steps ? steps.map((step, i) => (
            <StepCard key={i} stepKey={step.stepKey} number={step.number} text={step.text} checked={!!checkedSteps[step.stepKey]} onToggle={onToggle} />
          )) : <PlaceholderCard text={`[${addon?.title} step content goes here]`} />}
        </div>
      )}
    </div>
  )
}

function PlaceholderCard({ text, isAddon, isIncluded }) {
  return (
    <div className="p-4 rounded-sm flex items-start gap-3" style={{ background: isAddon ? 'rgba(212,160,23,0.03)' : 'rgba(255,255,255,0.015)', border: `1px dashed ${isAddon ? 'rgba(212,160,23,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
      {isAddon && <span className="text-yellow-400/40 text-[10px] tracking-widest uppercase font-bold whitespace-nowrap flex-shrink-0">{isIncluded ? '· Included' : '· Add-on'}</span>}
      <p className="text-white/20 text-sm italic">{text}</p>
    </div>
  )
}
