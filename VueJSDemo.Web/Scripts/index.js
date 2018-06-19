new Vue({
    el: '#app',
    mounted: function () {
        this.loadPeople();
    },
    data: {
        people: [],
        modalPerson: {
            FirstName: '',
            LastName: '',
            Age: ''
        },
        isEditMode: false,
        sortAsc: true
    },
    methods: {
        loadPeople: function (cb) {
            $.get('/home/getall', people => {
                this.people = people;
                if (cb) {
                    cb();
                }
            });
        },
        newClick: function () {
            $(".modal").modal();
            this.isEditMode = false;
        },

        addClick: function () {
            $.post('/home/addperson', this.modalPerson, () => {
                this.loadPeople(() => {
                    $('.modal').modal('hide');
                    this.modalPerson = {
                        FirstName: '',
                        LastName: '',
                        Age: ''
                    }
                });
            });
        },

        editClick: function (person) {
            this.isEditMode = true;
            this.modalPerson = Object.assign({}, person);
            $(".modal").modal();
        },

        updateClick: function () {
            $.post('/home/update', this.modalPerson, () => {
                this.loadPeople(() => {
                    $('.modal').modal('hide');
                    this.modalPerson = {
                        FirstName: '',
                        LastName: '',
                        Age: ''
                    }
                });
            });
        }, 
        deleteClick: function (id) {
            $.post('/home/delete', { id }, () => {
                this.loadPeople();
            });
        },
        sortClick: function () {
            let ascDesc = this.sortAsc ? 1 : -1;
            this.people.sort((a, b) => a.Age - b.Age * ascDesc);

            this.sortAsc = !this.sortAsc;
        }
    }
});