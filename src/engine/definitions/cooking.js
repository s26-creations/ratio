export const cooking = {
    // COOKING - FLOUR
    Cooking_Flour: {
        base: 'gram',
        symbol: 'g',
        name: 'Cooking (Flour)',
        units: {
            // WEIGHTS
            gram: { factor: '1', symbol: 'g', name: 'Gram' },
            kilogram: { factor: '1000', symbol: 'kg', name: 'Kilogram' },
            ounce: { factor: '28.349523125', symbol: 'oz', name: 'Ounce (Weight)' },
            pound: { factor: '453.59237', symbol: 'lb', name: 'Pound' },

            // FLOUR VOLUMES (~125g/cup)
            cup: { factor: '125', symbol: 'cup', name: 'Cup' },
            tablespoon: { factor: '7.8125', symbol: 'tbsp', name: 'Tablespoon' },
            teaspoon: { factor: '2.604166667', symbol: 'tsp', name: 'Teaspoon' },
        }
    },

    // COOKING - SUGAR
    Cooking_Sugar: {
        base: 'gram',
        symbol: 'g',
        name: 'Cooking (Sugar)',
        units: {
            // WEIGHTS
            gram: { factor: '1', symbol: 'g', name: 'Gram' },
            kilogram: { factor: '1000', symbol: 'kg', name: 'Kilogram' },
            ounce: { factor: '28.349523125', symbol: 'oz', name: 'Ounce (Weight)' },
            pound: { factor: '453.59237', symbol: 'lb', name: 'Pound' },

            // SUGAR VOLUMES (~200g/cup)
            cup: { factor: '200', symbol: 'cup', name: 'Cup' },
            tablespoon: { factor: '12.5', symbol: 'tbsp', name: 'Tablespoon' },
            teaspoon: { factor: '4.166666667', symbol: 'tsp', name: 'Teaspoon' },
        }
    },

    // COOKING - BUTTER
    Cooking_Butter: {
        base: 'gram',
        symbol: 'g',
        name: 'Cooking (Butter)',
        units: {
            // WEIGHTS
            gram: { factor: '1', symbol: 'g', name: 'Gram' },
            kilogram: { factor: '1000', symbol: 'kg', name: 'Kilogram' },
            ounce: { factor: '28.349523125', symbol: 'oz', name: 'Ounce (Weight)' },
            pound: { factor: '453.59237', symbol: 'lb', name: 'Pound' },

            // BUTTER VOLUMES (~227g/cup)
            stick: { factor: '113.3980925', symbol: 'stick', name: 'Stick' },
            cup: { factor: '226.796185', symbol: 'cup', name: 'Cup' },
            tablespoon: { factor: '14.1747615625', symbol: 'tbsp', name: 'Tablespoon' },
            teaspoon: { factor: '4.72492052', symbol: 'tsp', name: 'Teaspoon' },
        }
    },

    // COOKING - RICE
    Cooking_Rice: {
        base: 'gram',
        symbol: 'g',
        name: 'Cooking (Rice)',
        units: {
            // WEIGHTS
            gram: { factor: '1', symbol: 'g', name: 'Gram' },
            kilogram: { factor: '1000', symbol: 'kg', name: 'Kilogram' },
            ounce: { factor: '28.349523125', symbol: 'oz', name: 'Ounce (Weight)' },
            pound: { factor: '453.59237', symbol: 'lb', name: 'Pound' },

            // RICE VOLUMES (~185g/cup)
            cup: { factor: '185', symbol: 'cup', name: 'Cup' },
            tablespoon: { factor: '11.5625', symbol: 'tbsp', name: 'Tablespoon' },
        }
    },

    // COOKING - LIQUIDS
    Cooking_Liquids: {
        base: 'gram',
        symbol: 'g',
        name: 'Cooking (Liquids)',
        units: {
            // WEIGHTS (assuming water density 1g/ml)
            gram: { factor: '1', symbol: 'g', name: 'Gram' },
            kilogram: { factor: '1000', symbol: 'kg', name: 'Kilogram' },
            ounce: { factor: '28.349523125', symbol: 'oz', name: 'Ounce (Weight)' },
            pound: { factor: '453.59237', symbol: 'lb', name: 'Pound' },

            // LIQUID VOLUMES
            milliliter: { factor: '1', symbol: 'mL', name: 'Milliliter' },
            liter: { factor: '1000', symbol: 'L', name: 'Liter' },
            fluid_ounce: { factor: '29.5735295625', symbol: 'fl oz', name: 'Fluid Ounce' },
            cup: { factor: '236.5882365', symbol: 'cup', name: 'Cup' },
            tablespoon: { factor: '14.78676478125', symbol: 'tbsp', name: 'Tablespoon' },
            teaspoon: { factor: '4.92892159375', symbol: 'tsp', name: 'Teaspoon' },
            gallon: { factor: '3785.411784', symbol: 'gal', name: 'Gallon (US)' },
            quart: { factor: '946.352946', symbol: 'qt', name: 'Quart (US)' },
            pint: { factor: '473.176473', symbol: 'pt', name: 'Pint (US)' }
        }
    }
};
