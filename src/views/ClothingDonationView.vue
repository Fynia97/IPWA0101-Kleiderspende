
<template>
    <div class="content">
        <div class="text-center">
            <h1>Ihre Kleiderspende</h1>
            <img src="@/assets/brand/clothes.png" img-alt="Bild von Kleidern" width="70%" height="50%">
            <p v-if="donationWasSuccessful == false">Bitte füllen Sie das folgende Formular aus. Vielen Dank für Ihre
                Mithilfe!</p>
        </div>
    
        <form v-on:submit.prevent="OnSubmit()" v-if="donationWasSuccessful == false">
            <!--transfer point-->
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Art der Übergabe</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary text-center">Die Registrierung für die Übergabe an
                        der Geschäftsstelle wird vor Ort vorgenommen.</h6>
                    <div class="input-group mb-3">
                        <select class="form-select" id="inputGroupSelect01" v-model="transferPoint" required>
                            <option value="atTheOffice">Übergabe an der Geschäftsstelle</option>
                            <option value="atHome">Abholung gewünscht</option>
                        </select>
                    </div>
                </div>
            </div>

            <!--adress-->
            <div class="card" v-if="transferPoint == 'atHome'">
                <div class="card-body">
                    <h5 class="card-title text-center">Ihre Adresse</h5>
                    <input type="text" class="form-control" placeholder="Vorname" aria-label="Vorname"
                        aria-describedby="basic-addon1" v-model="firstname">
                    <input type="text" class="form-control" placeholder="Nachname" aria-label="Nachname"
                        aria-describedby="basic-addon1" v-model="lastname" required>
                    <input type="text" class="form-control" placeholder="Straße" aria-label="street"
                        aria-describedby="basic-addon1" v-model="street" required>
                    <input type="text" class="form-control" placeholder="Hausnummer" aria-label="houseNumber"
                        aria-describedby="basic-addon1" v-model="houseNumber" required>
                    <input type="text" class="form-control" placeholder="Postleitzahl" aria-label="zip"
                        aria-describedby="basic-addon1" v-model="zip" required @blur="InvalidAdress()">
                    <input type="text" class="form-control" placeholder="Ort" aria-label="city"
                        aria-describedby="basic-addon1" v-model="city" required>
                    <p v-if="invalidAdress"><span class="warning">Die Adresse liegt zu weit von der Postleitzahl 12345
                            entfernt, daher ist
                            eine Abholung leider nicht möglich.
                            Bitte bringen Sie die Kleidung persönlich vorbei.</span></p>
                </div>
            </div>

            <!--Type of clothing-->
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Art der Kleidung</h5>
                    <div class="form-outline">
                        <label class="form-label" for="typeNumber">Wie viele verschiedene Arten?</label>
                        <input type="number" min="1" id="typeNumber" class="form-control"
                            v-model="numberOfDifferentTypesOfClothing" />
                    </div>
                    <label for="exampleDataList" class="form-label">Art der Kleidung: </label>
                    <div v-for="n in numberOfDifferentTypesOfClothing">
                        <input v-model="typeOfClothing[n]" class="form-control" list="datalistOptionsClothing"
                            placeholder="Tippe oder Doppelklick, um zu suchen..." required>
                    </div>
                    <datalist id="datalistOptionsClothing">
                        <option value="Oberteil"></option>
                        <option value="Hemd"></option>
                        <option value="Kleid"></option>
                        <option value="Hose"></option>
                        <option value="Schuhe"></option>
                        <option value="Sonstiges"></option>
                    </datalist>
                </div>
            </div>

            <!--Current crisis area-->
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Zweck der Spende</h5>
                    <label for="exampleDataList" class="form-label">Für Krisengebiet: </label>
                    <input class="form-control" list="datalistOptionsArea"
                        placeholder="Tippe oder Doppelklick, um zu suchen..." v-model="area" required>
                    <datalist id="datalistOptionsArea">
                        <option value="Afrika"></option>
                        <option value="Syrien"></option>
                        <option value="Wo es am Dringsten ist"></option>
                    </datalist>
                </div>
            </div>

            <button v-if="invalidAdress == false" type="submit" class="btn btn-primary">Spende registrieren</button>
        </form>

        <!--Display Userinput-->
        <div v-if="donationWasSuccessful == true">
            <h2 style="margin-top: 4vh">Ihre Eingaben:</h2>
            <p><span class="bulletPoint">Übergabe:</span> {{ transferPoint == "atHome" ? "Abholung" : "an der Geschäftsstelle" }}</p>
            <div v-if="transferPoint == 'Abholung'">
                <p><span class="bulletPoint">Ihre Adresse:</span> {{ firstname }} {{ lastname }}, {{ street }} {{
                    houseNumber }}, {{ zip }} {{ city }} </p>
                <p>Wir melden uns bei Ihnen bezüglich des genauen Abholtermins.</p>
            </div>
            <p><span class="bulletPoint">Sie geben folgende Arten von Kleidung ab:</span></p>
            <ul>
                <li v-for="element in typeOfClothing">{{ element }}</li>
            </ul>
            <p><span class="bulletPoint">Sie haben gespendet für das Krisengebiet:</span> {{ area }}</p>

            <p><span class="bulletPoint">Gespeichert am/um:</span> {{ dateOfSuccessfullRegistration }} Uhr</p>

            <p>Wir danken herzlich für diese Spende! Sie können die Seite nun verlassen.</p>
        </div>
    </div>
</template>


<script lang="ts">
export default {
    data() {
        return {
            //for form
            transferPoint: "",
            firstname: "",
            lastname: "",
            street: "",
            houseNumber: "",
            zip: "",
            city: "",
            numberOfDifferentTypesOfClothing: 1,
            typeOfClothing: [],
            area: "",

            //validation
            invalidAdress: false,

            //variables for the end of registration
            donationWasSuccessful: false,
            dateOfSuccessfullRegistration: ""
        };
    },
    methods: {
        OnSubmit() {
            this.typeOfClothing = [...new Set(this.typeOfClothing.filter(n => n))];
            
            this.donationWasSuccessful = true;
            this.dateOfSuccessfullRegistration = new Date().toLocaleString();
        },
        InvalidAdress() {
            const officeZip = "12345";
            if (this.zip.length >= 2) {
                this.invalidAdress = this.zip.slice(0, 2) != officeZip.slice(0, 2);
            }
            else {
                this.invalidAdress = false;
            }
        }
    }
};
</script>