'use strict';

class Aplikace {
    constructor(){
        const pojistenciZeStorage = localStorage.getItem("pojistenci");
        this.pojistenci = pojistenciZeStorage ? JSON.parse(pojistenciZeStorage) : [];
        
        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.vekInput = document.getElementById("vek");
        this.telefonInput = document.getElementById("telefon");
        this.ulozitButton = document.querySelector("form");
        this.vypisElement = document.getElementById("tabulka");

        const notifikace = document.getElementById("notifikace");

        this._nastavUdalosti();

    }
    
    _nastavUdalosti() {
        this.ulozitButton.onsubmit = (e) => {
            e.preventDefault();
            const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
            this.pojistenci.push(pojistenec);

            this.ulozPojistence();
            this.vypisPojistence();
            this._pridejNotifikaci("alert-success", "Pojištěnec byl úspěšně přidán!");
        };
    }

    vypisPojistence(){
        this.vypisElement.innerHTML = "";

        for (const pojistenec of this.pojistenci) {

            const radek = document.createElement("tr");
           

            radek.insertAdjacentHTML("beforeend", `<td>${pojistenec.jmeno} ${pojistenec.prijmeni} </td>
                                                <td>${pojistenec.telefon}</td>
                                                <td>${pojistenec.vek}</td>`);
            
            this._pridejTlacitko("Odstranit", () => {
                if (confirm("Opravdu si přejete odstranit pojištěnce?")){
                    this.pojistenci = this.pojistenci.filter(p => p !== pojistenec);
                    this.ulozPojistence();
                    this.vypisPojistence();
                    this._pridejNotifikaci("alert-danger", "Pojištěnec byl úspěšně odstraněn!");
                }
            }, radek, "btn-danger");


            this._pridejTlacitko("Editovat", () => {
                document.write("Kliknuto");
                this.ulozPojistence();
                this.vypisPojistence();
            }, radek, "btn-warning");

            
            radek.insertAdjacentHTML("beforeend", "</tr>");
            this.vypisElement.appendChild(radek);

        }
    }
    
    _pridejTlacitko(titulek, callback, element, barvaTlacitka) {
        const button = document.createElement("button");
        button.innerText = titulek;
        button.onclick = callback;
        button.classList.add("btn");
        button.classList.add("m-1");
        button.classList.add(barvaTlacitka);
        element.appendChild(button);
    }

    _pridejNotifikaci(barvaNotifikace, oznameni) {
        const toast = document.createElement("p");
        toast.classList.add(barvaNotifikace);
        toast.innerHTML = oznameni;
        toast.insertAdjacentHTML("beforeend", `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span></button>`);
        toast.classList.add("alert");
        toast.classList.add("alert-dismissible");
        toast.classList.add("fade");
        toast.classList.add("show");
        notifikace.appendChild(toast);
    }

    ulozPojistence(){
        localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci));
    }  
}
