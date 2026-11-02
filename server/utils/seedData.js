export const sampleCrops = [
    {
        name: 'Rice',
        category: 'Cereal',
        season: 'Kharif',
        waterRequirement: 'High',
        soilType: 'Clay / Clay Loam soils',
        description: 'A primary cereal crop grown extensively in wet Kharif season requiring rich moisture.',
        nutrientCharacteristics: 'Heavy feeder of Nitrogen, Phosphorus, and Potassium.',
        rotationBenefits: 'Improves soil moisture retention; when rotated with pulses, soil structure and nitrogen balance recover.',
        suitableFollowingCrops: ['Green Gram', 'Black Gram', 'Chickpea', 'Mustard'],
        image: '/images/rice.png',
    },
    {
        name: 'Wheat',
        category: 'Cereal',
        season: 'Rabi',
        waterRequirement: 'Medium',
        soilType: 'Well-drained Fertile Loam',
        description: 'A major Rabi staple cereal cultivated in temperate and subtropical climates.',
        nutrientCharacteristics: 'High uptake of Nitrogen and Phosphorus during tillering stage.',
        rotationBenefits: 'Interrupts weed species associated with Kharif legumes and builds soil organic matter.',
        suitableFollowingCrops: ['Soybean', 'Green Gram', 'Maize', 'Sunflower'],
        image: '/images/wheat.png',
    },
    {
        name: 'Maize',
        category: 'Cereal',
        season: 'Kharif',
        waterRequirement: 'Medium',
        soilType: 'Deep Fertile Loamy Soil',
        description: 'Versatile cereal crop used for grain, fodder, and bio-industrial raw material.',
        nutrientCharacteristics: 'Responds well to balanced N-P-K fertilization; high biomass producer.',
        rotationBenefits: 'Extensive root network opens hard soil layers and adds substantial organic residues.',
        suitableFollowingCrops: ['Chickpea', 'Mustard', 'Potato', 'Groundnut'],
        image: '/images/maize.png',
    },
    {
        name: 'Green Gram',
        category: 'Legume',
        season: 'Zaid',
        waterRequirement: 'Low',
        soilType: 'Well-drained Loamy Soil',
        description: 'Short-duration leguminous pulse crop ideal for crop rotation between main seasons.',
        nutrientCharacteristics: 'Fixes 30-40 kg atmospheric nitrogen per hectare through root Rhizobium nodules.',
        rotationBenefits: 'Enriches soil nitrogen reserves, breaks cereal pest cycles, and conserves residual soil moisture.',
        suitableFollowingCrops: ['Wheat', 'Maize', 'Mustard', 'Cotton'],
        image: '/images/green_gram.png',
    },
    {
        name: 'Chickpea',
        category: 'Pulse',
        season: 'Rabi',
        waterRequirement: 'Low',
        soilType: 'Sandy Clay Loam / Black Cotton Soil',
        description: 'Important drought-resistant Rabi pulse fixing vital nitrogen into the soil.',
        nutrientCharacteristics: 'High biological nitrogen fixation capacity; deep taproot extracts lower subsoil moisture.',
        rotationBenefits: 'Improves soil porosity, builds nitrogen reserves for next Kharif cereal crop.',
        suitableFollowingCrops: ['Rice', 'Maize', 'Cotton', 'Sorghum'],
        image: '/images/chickpea.png',
    },
    {
        name: 'Groundnut',
        category: 'Oilseed',
        season: 'Kharif',
        waterRequirement: 'Medium',
        soilType: 'Loose Well-Drained Sandy Loam',
        description: 'Leguminous oilseed crop valued for high quality edible oil and soil conditioning.',
        nutrientCharacteristics: 'Fixes atmospheric nitrogen while extracting calcium and sulfur for pod development.',
        rotationBenefits: 'Foliage litter adds rich green manure to soil after pod harvesting.',
        suitableFollowingCrops: ['Wheat', 'Sorghum', 'Sunflower', 'Maize'],
        image: '/images/groundnut.png',
    },
    {
        name: 'Soybean',
        category: 'Legume',
        season: 'Kharif',
        waterRequirement: 'Medium',
        soilType: 'Well-Drained Black Cotton Soil',
        description: 'Dual-purpose protein legume and oilseed crop widely cultivated in rainfed ecosystems.',
        nutrientCharacteristics: 'Highest nitrogen-fixing capability among annual oilseeds.',
        rotationBenefits: 'Leaves significant residual nitrogen; suppresses broadleaf weed populations.',
        suitableFollowingCrops: ['Wheat', 'Mustard', 'Chickpea', 'Barley'],
        image: '/images/soybean.png',
    },
    {
        name: 'Cotton',
        category: 'Cash Crop',
        season: 'Kharif',
        waterRequirement: 'Medium',
        soilType: 'Deep Black Cotton Soil',
        description: 'Major fiber cash crop requiring long warm growing season.',
        nutrientCharacteristics: 'Deep rooted heavy nutrient consumer; requires balanced N-P-K and micro-nutrients.',
        rotationBenefits: 'Deep taproot system opens subsoil layer, allowing subsequent shallow-rooted crops to thrive.',
        suitableFollowingCrops: ['Chickpea', 'Wheat', 'Groundnut', 'Green Gram'],
        image: '/images/cotton.png',
    },
    {
        name: 'Sunflower',
        category: 'Oilseed',
        season: 'All-Season',
        waterRequirement: 'Low',
        soilType: 'Well-drained Loam / Sandy Loam',
        description: 'Photo-insensitive oilseed crop adapted to diverse climate conditions.',
        nutrientCharacteristics: 'Efficient scavenger of deep soil nutrients and residual soil moisture.',
        rotationBenefits: 'Deep root penetration breaks compact soil hardpans.',
        suitableFollowingCrops: ['Rice', 'Wheat', 'Legumes', 'Groundnut'],
        image: '/images/sunflower.png',
    },
    {
        name: 'Mustard',
        category: 'Oilseed',
        season: 'Rabi',
        waterRequirement: 'Low',
        soilType: 'Light to Medium Loam',
        description: 'Cool season oilseed crop with low water requirement and high bio-fumigant properties.',
        nutrientCharacteristics: 'Responds well to sulfur and nitrogen enrichment.',
        rotationBenefits: 'Glucosinolate compounds in root exudates act as natural bio-fumigant against soil nematodes.',
        suitableFollowingCrops: ['Rice', 'Maize', 'Green Gram', 'Cotton'],
        image: '/images/mustard.png',
    },
];

export const sampleQuizQuestions = [
    {
        question: 'What is the primary agronomical benefit of incorporating legumes (e.g., pulses, groundnut) in crop rotation?',
        options: [
            'They absorb maximum irrigation water from subsoil',
            'They fix atmospheric nitrogen into the soil via Rhizobium root nodules',
            'They prevent soil temperature from rising in summer',
            'They eliminate the need for any pest management',
        ],
        correctAnswer: 1,
        explanation: 'Legumes form a symbiotic association with Rhizobium bacteria in their root nodules, converting atmospheric nitrogen into plant-absorbable soil nitrates.',
        difficulty: 'Easy',
    },
    {
        question: 'Why should deep-rooted crops (like Cotton or Sunflower) be rotated with shallow-rooted crops (like Rice or Wheat)?',
        options: [
            'To prevent light penetration to soil surface',
            'To utilize nutrients from different soil depth zones and prevent hardpan formation',
            'To increase seed size of subsequent crops',
            'To eliminate all weed species permanently',
        ],
        correctAnswer: 1,
        explanation: 'Alternating deep and shallow root systems ensures uniform extraction of soil nutrients across soil horizons without depleting a single layer.',
        difficulty: 'Medium',
    },
    {
        question: 'How does crop rotation help break pest and disease cycles?',
        options: [
            'Pests become friendly insects in the next season',
            'Host-specific pests and pathogens starve when non-host crops are planted',
            'Soil chemical pH changes to liquid acid',
            'Crops emit ultrasound waves that repel insects',
        ],
        correctAnswer: 1,
        explanation: 'Many agricultural pests and fungal pathogens are host-specific. Disrupting the continuous planting of their host crop prevents population multiplication.',
        difficulty: 'Medium',
    },
    {
        question: 'Which cropping sequence represents a balanced, highly sustainable 3-year rotation?',
        options: [
            'Rice → Rice → Rice → Rice',
            'Rice (Heavy Feeder) → Chickpea/Legume (Nitrogen Fixer) → Maize (Cereal/Biomass)',
            'Cotton → Cotton → Cotton → Sugarcane',
            'Wheat → Wheat → Wheat → Wheat',
        ],
        correctAnswer: 1,
        explanation: 'Alternating heavy nutrient consumers (Rice) with nitrogen replenishing legumes (Chickpea) followed by high biomass crops maintains long-term fertility.',
        difficulty: 'Easy',
    },
    {
        question: 'What bio-fumigant effect do Mustard crop root exudates provide to the soil?',
        options: [
            'Release of natural glucosinolates that suppress soil-borne pathogens and nematodes',
            'Production of synthetic nitrogen gas',
            'Sterilization of all earthworms in soil',
            'Absorption of oxygen from atmosphere',
        ],
        correctAnswer: 0,
        explanation: 'Cruciferous crops like Mustard release glucosinolate compounds that break down into natural suppresses against soil nematodes and wilt fungi.',
        difficulty: 'Hard',
    },
    {
        question: 'Which soil degradation issue is directly minimized by continuous cover crop rotation?',
        options: [
            'Soil erosion by wind and water run-off',
            'Sunlight reflection from leaves',
            'Over-production of oxygen in fields',
            'Seed germination delay',
        ],
        correctAnswer: 0,
        explanation: 'Keeping soil covered with alternating crop roots holds soil aggregates together, drastically reducing topsoil erosion caused by heavy rains and wind.',
        difficulty: 'Easy',
    },
];

export const sampleResources = [
    {
        title: 'Fundamentals of Sustainable Crop Rotation',
        description: 'Learn the core principles of rotating cereal, legume, oilseed, and cover crops to optimize soil vitality.',
        category: 'Crop Rotation Basics',
        content: `Crop rotation is the strategic practice of growing a series of different types of crops in the same area across consecutive seasons. 

### Core Objectives:
1. **Soil Nutrient Restoration**: Heavy feeders like Rice and Maize consume vast amounts of nitrogen and phosphorus. Rotating them with leguminous crops (Chickpea, Green Gram) replenishes nitrogen back into the soil organic layer.
2. **Pest Cycle Breakdown**: Persistent monoculture fosters insect and disease build-up. Alternating crop families starves host-specific pests.
3. **Weed Population Management**: Different crop canopy dynamics and tillage timings suppress stubborn weed species naturally.`,
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
        readTime: '6 min read',
    },
    {
        title: 'Biological Nitrogen Fixation in Leguminous Crops',
        description: 'Discover how Rhizobium bacteria fix atmospheric nitrogen into nitrates and reduce chemical fertilizer dependency.',
        category: 'Nutrient Management',
        content: `Legumes play a cornerstone role in ecological agriculture through biological nitrogen fixation (BNF).

### How BNF Works:
- Root hairs emit flavonoids that attract soil *Rhizobium* bacteria.
- Bacteria enter root cortex forming pink nodules containing leghaemoglobin.
- Converts atmospheric $N_2$ into plant usable ammonium ions ($NH_4^+$).
- Subsequent crops benefit from 30–60 kg/ha residual active nitrogen.`,
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60',
        readTime: '5 min read',
    },
    {
        title: 'Managing Soil Micro-Biomes & Organic Carbon',
        description: 'Explore how root exudates and crop residue diversity cultivate rich microbial soil food webs.',
        category: 'Soil Health',
        content: `Healthy soil is a living organism containing billions of beneficial fungi, mycorrhizae, and earthworms per gram.

Continuous monoculture degrades microbial biodiversity. Rotating crops with varied root architecture ensures diverse carbon exudates, promoting resilient mycorrhizal networks that mobilize insoluble phosphorus and improve soil structure.`,
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60',
        readTime: '7 min read',
    },
    {
        title: 'Integrated Pest & Disease Breakdown Strategies',
        description: 'Practical guides on selecting non-host crop families to break nematodes, blights, and root-rot pathogens.',
        category: 'Pest Management',
        content: `Pathogens like *Fusarium* wilt and *Meloidogyne* root-knot nematodes overwinter in crop stubble. Planting susceptible crops year after year exponentially multiplies pathogen spores.

By introducing non-host crops like Mustard or Sorghum, pathogen spores fail to find host roots and die off naturally within 1 to 2 seasons.`,
        image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60',
        readTime: '4 min read',
    },
];
