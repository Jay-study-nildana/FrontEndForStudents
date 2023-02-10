var batmanDataObject = {

    constructor() {
        this.batmanData = [
            { name: 'Batman', age: 30, location: 'Gotham' },
            { name: 'Robin', age: 20, location: 'Gotham' },
            { name: 'Alfred', age: 50, location: 'Gotham' },
            { name: 'Joker', age: 40, location: 'Gotham' },
            { name: 'Penguin', age: 35, location: 'Gotham' },
            { name: 'Catwoman', age: 25, location: 'Gotham' },
            { name: 'Riddler', age: 30, location: 'Gotham' },
            { name: 'Two-Face', age: 30, location: 'Gotham' },
            { name: 'Scarecrow', age: 30, location: 'Gotham' },
            { name: 'Poison Ivy', age: 30, location: 'Gotham' },
            { name: 'Mr. Freeze', age: 30, location: 'Gotham' },
            { name: 'Harley Quinn', age: 30, location: 'Gotham' },
            { name: 'Bane', age: 30, location: 'Gotham' },
            { name: 'Ra’s al Ghul', age: 30, location: 'Gotham' },
        ];

    },

    //function to add id to each object in array

    addId() {

        //console.log(this.batmanData);
        for (let i = 0; i < this.batmanData.length; i++) {

            this.batmanData[i].id = i + 1;

        }
        //console.log(this.batmanData);

    },




    getBatmanData() {

        return this.batmanData;

    },

    getBatmanDataById(id) {
            
            return this.batmanData[id];
    
    }

}

export default batmanDataObject;