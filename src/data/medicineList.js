let medicineList = [
    {
        id: 1,
        name: 'Panadol',
        manufacturer: 'GSK',
        dosage: 'injection',
        price: 40,
        stripes_per_packet: '20',
        packaging: '14s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_14",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 2,
        name: 'Panadol',
        manufacturer: 'GSK',
        dosage: 'tablet',
        price: 40,
        stripes_per_packet: '20',
        packaging: '15s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 3,
        name: 'Panadol',
        manufacturer: 'GSK',
        dosage: 'injection',
        price: 40,
        stripes_per_packet: '20',
        packaging: '16s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 4,
        name: 'Panadol Extra',
        manufacturer: 'GSK',
        dosage: 'injection',
        price: 40,
        stripes_per_packet: '20',
        packaging: '17s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 5,
        name: 'Panadol Extra',
        manufacturer: 'GSK',
        dosage: 'tablet',
        price: 40,
        stripes_per_packet: '20',
        packaging: '18s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 6,
        name: "Merck Private Limited",
        manufacturer: 'GSK',
        dosage: 'tablet',
        price: 40,
        stripes_per_packet: '20',
        packaging: '19s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 7,
        name: 'Buscopan Plus',
        manufacturer: "Merck Private Limited",
        dosage: 'injection',
        price: 40,
        stripes_per_packet: '20',
        packaging: '20s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 8,
        name: 'Nuberol',
        manufacturer: "Searl Pakistan (PVT) ltd",
        dosage: 'syrup',
        price: 40,
        stripes_per_packet: '20',
        packaging: '21s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 9,
        name: 'Nuberol',
        manufacturer: "Searl Pakistan (PVT) ltd",
        dosage: 'syrup',
        price: 40,
        stripes_per_packet: '20',
        packaging: '22s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 10,
        name: 'Regopan Plus',
        manufacturer: "Regent Laboritories ltd",
        dosage: 'injection',
        price: 40,
        stripes_per_packet: '20',
        packaging: '23s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 11,
        name: 'Regopan Plus',
        manufacturer: "Regent Laboritories ltd",
        dosage: 'syrup',
        price: 40,
        stripes_per_packet: '20',
        packaging: '24s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 12,
        name: 'Nuberol Plus',
        manufacturer: "Searl Pakistan (PVT) ltd",
        dosage: 'injection',
        price: 40,
        stripes_per_packet: '20',
        packaging: '25s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 56,
        name: 'Augmentan',
        manufacturer: 'GSK',
        dosage: 'tablet',
        price: 40,
        stripes_per_packet: '20',
        packaging: '14s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_14",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 45,
        name: 'Calamox',
        manufacturer: 'Bosch Pharmaceuticals',
        dosage: 'tablet',
        price: 40,
        stripes_per_packet: '20',
        packaging: '15s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    },
    {
        id: 32,
        name: 'Fexit-D',
        manufacturer: 'Getz Pharma',
        dosage: 'tablet',
        price: 40,
        stripes_per_packet: '20',
        packaging: '16s',
        product_code: '123asd213asdzxczdasd',
        generics: [
            {
                drugname: "aspirin_1",
                strength: "100mg"
            },
            {
                drugname: "aspirin_2",
                strength: "100mg"
            },
            {
                drugname: "aspirin_3",
                strength: "100mg"
            }
        ]  
    }
];

export default medicineList;