const fs = require('fs');
const { filterByQuery, findById, createNewZookeeper, validateZookeeper, } = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');
jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "1" },
        zookeepers
    );

    expect(zookeeper.name).toBe('Darlene');
    expect(zookeeper.id).toBe('1');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            age: 20,
            favoriteAnimal: 'Dog',
        },
        {
            id: '4',
            name: 'Josh',
            age: 27,
            favoriteAnimal: 'Cat',
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 20 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            age: 20,
            favoriteAnimal: 'Dog',
        },
        {
            id: '4',
            name: 'Josh',
            age: 27,
            favoriteAnimal: 'Cat',
        },
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Erica');
});

test('validates favorite animal', () => {
    const zookeeper = {
        id: '3',
        name: 'Erica',
        age: 20,
        favoriteAnimal: 'Dog',
    };

    const invalidZookeeper = {
        id: '4',
        name: 'Josh',
        age: 27,
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});