/*
Réalisé par Melvin COURANT du groupe A en UX2i
 */

class Joueur {
    constructor(pseudo, score, choix, avatar){
        this.pseudo = pseudo;
        this.score = 0;
        this.choix = choix;
        this.avatar = avatar;
    }

    //Rajoute un point au score lors d'une victoire
    affecterVictoire(){
        this.score += 1;
    }

    //Permet de changer de pseudo
    changerPseudo(newPseudo){
        this.pseudo = newPseudo;
    }
}

class Ordi {
    constructor(pseudo, score, choix, avatar){
        this.pseudo = pseudo;
        this.score = 0;
        this.choix = choix;
        this.avatar = avatar;
    }

    //Rajoute un point au score lors d'une victoire
    affecterVictoire(){
        this.score += 1;
    }
}

class AireDeJeu{
    constructor(compteRebours, gagnant){
        this.compteRebours = 0;
        this.gagnant = "";
    }

    //Compteur à rebours qui s'auto-incrémente
    timerIncrement(){
        this.compteRebours += 1;
     }

    /* Pierre = 0
        * Feuille = 1
        * Ciseaux = 2*/

    //Défini qui a gagné selon le choix des deux joueurs sinon renvoi égalité
    resultatPartie(choixHumain, choixOrdi){

        if (choixHumain === choixOrdi){
            this.gagnant = "Egalite";
        }

        else if (
            ((choixHumain === 0) && (choixOrdi === 1))
        || ((choixHumain === 1) && (choixOrdi === 2))
        || ((choixHumain === 2) && (choixOrdi === 0))
        ){
            this.gagnant = "Ordi";
        }
        else {
            this.gagnant = "Joueur";
        }
    }
}

var nouvellePartie = document.getElementById("jouer");
var mainJoueur = document.querySelector("#cote-joueur img");
var mainOrdi = document.querySelector("#cote-ordi img");
var scoreJoueur = document.querySelector("#score-joueur");
var scoreOrdi = document.querySelector("#score-ordi");
var nomJoueur = document.getElementById("pseudo-joueur");
var pierre = document.getElementById("pierre");
var feuille = document.getElementById("feuille");
var ciseaux = document.getElementById("ciseaux");
var rejouer = document.getElementById("rejouer");
var connexion = document.getElementById("connexion");
var formConnexion = document.getElementById('formulaire-connexion');
var valider = document.getElementById("valider");
var profil = document.getElementById('profil');
var avatarRandomO = Math.floor(Math.random() * (16 - 1 + 1)) + 1; //Sert pour les mettre aléatoirement un avatar à l'ordi
var pseudoJoueur;
var idAvatar;
var nScore = localStorage.getItem('nScore');
var gagnantFinal;

//Vérifie si le joueur s'est connecté et à un pseudo, si c'est le cas il est inséré automatiquement et le lien connexion devient le lien du profil
if(localStorage.getItem('pseudo') != undefined){
    pseudoJoueur = localStorage.getItem('pseudo');
    profil.textContent = pseudoJoueur;
    connexion.style.display = 'none';
    profil.style.display = 'block';
}
else {
    pseudoJoueur = "";
}

//Vérifie si le joueur s'est connecté et à un avatar, si c'est le cas il est inséré automatiquement
if(localStorage.getItem('avatar') != undefined){
    idAvatar = localStorage.getItem('avatar');
    document.getElementById("avatar-joueur").style.backgroundImage= "url('"+document.getElementById(idAvatar).src+"')";
}
else {
    idAvatar = "";
}

//Insére un avatar aléatoire à l'ordi
document.getElementById("avatar-ordi").style.backgroundImage= "url('img/fighter"+avatarRandomO+".png')";

//Affichage et gestion de la connexion
connexion.onclick = function () {
    formConnexion.className += "visible-flex";
    document.getElementById("blocker").className += "visible-flex"; //Bloque les autres choix du menu pendant cette phase

    valider.onclick = function () {
        formConnexion.className = valider.className.replace("visible-flex", "");
        pseudoJoueur = document.getElementById("pseudo-form").value;

        //Si le pseudo n'est pas saisie, "Joueur" est mit par défaut
        if (document.getElementById("pseudo-form").value === ""){
            pseudoJoueur = "Joueur";
        }

        //Insère l'avatar choisie
        if(idAvatar !== ""){
            document.getElementById("avatar-joueur").style.backgroundImage= "url('"+document.getElementById(idAvatar).src+"')";
        }
        //Si l'avatar n'est pas choisi, un avatar sera choisi aléatoirement
        else if (idAvatar === "") {
            var avatarRandomJ = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
            document.getElementById("avatar-joueur").style.backgroundImage= "url('img/fighter"+avatarRandomJ+".png')";
        }

        //Débloque le menu
        document.getElementById("blocker").className = document.getElementById("blocker").className.replace("visible-flex", "");
        //Stockage en local du pseudo et de l'avatar du joueur puis l'affiche en jeu
        localStorage.setItem('pseudo', pseudoJoueur);
        localStorage.setItem('avatar', idAvatar);
        pseudoJoueur = localStorage.getItem('pseudo');
        profil.textContent = pseudoJoueur;
        nomJoueur.textContent = pseudoJoueur;
        connexion.style.display = 'none';
        profil.style.display = 'block';
    }
};

profil.onclick = function () {
    document.getElementById("blocker").className += "visible-flex"; //Bloque les autres choix du menu pendant cette phase
    document.getElementById('box-profil').className += "visible-flex";
    document.getElementById('h1-pseudo').textContent = pseudoJoueur;
    document.getElementById('avatar-joueur2').style.backgroundImage = "url('"+document.getElementById(idAvatar).src+"')";

    //Vérifie pour chaque score s'il existe, sinon il n'est pas affiché
    if(localStorage.getItem('resultat1') != undefined){
        document.getElementById('score-1').textContent = ''+localStorage.getItem('winorlose1')+' '+localStorage.getItem('resultat1');
    }
    if(localStorage.getItem('resultat2') != undefined){
        document.getElementById('score-2').textContent = ''+localStorage.getItem('winorlose2')+' '+localStorage.getItem('resultat2');
    }
    if(localStorage.getItem('resultat3') != undefined){
        document.getElementById('score-3').textContent = ''+localStorage.getItem('winorlose3')+' '+localStorage.getItem('resultat3');
    }

    document.getElementById('box-profil').onclick = function () {
        document.getElementById('box-profil').className = document.getElementById('box-profil').className.replace("visible-flex", "");
        document.getElementById('blocker').className = document.getElementById('blocker').className.replace("visible-flex", "");
    }
}

//Fonction qui renvoie le numéro de l'avatar choisie et supprime les autres ayant été sélectionné précédemment
function avatarSelect(n) {
    for (let i = 1; i < 17; i++){
        document.getElementById(i).className = document.getElementById(i).className.replace("avatarChoisi", "")
    }

    document.getElementById(n).className = "avatarChoisi";
    idAvatar = n;
}

//Lancement de la partie
nouvellePartie.onclick = function (){
    if(pseudoJoueur === ""){
        pseudoJoueur = "Joueur"
    }

    if(idAvatar === ""){
        var avatarRandomJ = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
        document.getElementById("avatar-joueur").style.backgroundImage= "url('img/fighter"+avatarRandomJ+".png')";
    }

    var joueur = new Joueur(pseudoJoueur, 0, "", idAvatar);
    var ordi = new Ordi("Ordi", 0, "", "");
    nomJoueur.textContent = joueur.pseudo;
    scoreJoueur.textContent = joueur.score;
    scoreOrdi.textContent = ordi.score;
    mainJoueur.src = "";
    mainOrdi.src = "";
    rejouer.className = rejouer.className.replace("visible", "");
    document.querySelector("#compte-rebours p").textContent = "";
    document.getElementById("score").className = "visible-flex";

    var jeu = new AireDeJeu(0, "");

    //Fonction qui défini aléatoirement le choix de l'ordi
    function choixRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function momentChoixOrdi(){
        ordi.choix = choixRandom(0, 2);

        //Affiche l'image correspondante au choix
        if (ordi.choix === 0){
            mainOrdi.src = "img/Pierre-main.svg";
        }

        else if(ordi.choix === 1){
            mainOrdi.src = "img/Feuille-main.svg";
        }

        else if(ordi.choix === 2){
            mainOrdi.src = "img/Ciseaux-main.svg";
        }

        else {
            mainOrdi.src = "";
        }
    }

    function momentChoixJoueur() {
        //Défini aléatoirement le choix du joueur si un choix n'a pas été fait
        if (joueur.choix !== 0 && joueur.choix !== 1 && joueur.choix !== 2){
            function choixRandomJoueur(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            joueur.choix = choixRandomJoueur(0,2);

            //Affiche l'image correspondante au choix
            if(joueur.choix === 0){
                mainJoueur.src = "img/Pierre-main.svg";
            }
            else if (joueur.choix === 1){
                mainJoueur.src = "img/Feuille-main.svg";
            }
            else if (joueur.choix === 2){
                mainJoueur.src = "img/Ciseaux-main.svg";
            }
            else {
                alert("Erreur, problème avec le choix du joueur");
            }
        }
    }

    //Partie du jeu qui se déroule pendant le compte à rebours
    function timer(){
        jeu.timerIncrement();

        //Quand le compte à rebours passe à "FIGHT !"
        if (jeu.compteRebours === 4){
            document.querySelector("#compte-rebours p").textContent = "FIGHT !";
            window.clearInterval(compteur);

            console.log(jeu.compteRebours);
            setTimeout(resultat,1000);

            //Gère la partie score de la partie
            function resultat(){
                jeu.resultatPartie(joueur.choix, ordi.choix);
                console.log(jeu.resultatPartie(joueur.choix, ordi.choix));

                if (jeu.gagnant === "Ordi"){
                    ordi.affecterVictoire();
                    if (ordi.score < 3){
                        document.querySelector("#compte-rebours p").textContent = "Un point pour l'ordi";
                    }
                }
                if(jeu.gagnant === "Joueur"){
                    joueur.affecterVictoire();
                    if (joueur.score < 3){
                        document.querySelector("#compte-rebours p").textContent = "Un point pour " + joueur.pseudo;
                    }
                }
                if (jeu.gagnant === "Egalite") {
                    document.querySelector("#compte-rebours p").textContent = "Egalité !";
                }

                scoreJoueur.textContent = joueur.score;
                scoreOrdi.textContent = ordi.score;
                //Affiche un bouton "Rejouer" pour lancer la manche suivante si aucun joueurs n'a atteint trois points
                if (joueur.score < 3 && ordi.score < 3){
                    rejouer.className += "visible";
                }

                //Affiche et stocke le gagnant de la partie
                else{
                    if (ordi.score === 3){
                        document.querySelector("#compte-rebours p").textContent = "L'ordi gagne la partie !";
                        gagnantFinal = "Ordi";
                    }

                    else if(joueur.score === 3) {
                        document.querySelector("#compte-rebours p").textContent = joueur.pseudo + " gagne la partie !";
                       gagnantFinal = pseudoJoueur;
                    }

                    //Si le joueur s'est connecté, les 3 derniers scores des dernières parties seront stockés
                    if (localStorage.getItem('pseudo') !== undefined){
                        if (nScore === ''){
                            nScore = 0;
                        }

                        if(nScore < 4){
                            nScore++;
                            localStorage.setItem('nScore', nScore);

                            if(gagnantFinal === "Ordi"){
                                localStorage.setItem('winorlose'+nScore, 'Défaite');
                            }

                            if(gagnantFinal === pseudoJoueur){
                                localStorage.setItem('winorlose'+nScore, 'Victoire');
                            }

                            localStorage.setItem('resultat'+nScore, ''+joueur.score+':'+ordi.score+'');
                        }
                        //Si on passe au dessus du 3ème score, le premier score enregistré est effacé et les autres scores sont décalés pour rajouter le nouveau
                        if(nScore >= 4) {
                            if(gagnantFinal === "Ordi"){
                                localStorage.setItem('winorlose1', 'Défaite');
                            }

                            if(gagnantFinal === pseudoJoueur){
                                localStorage.setItem('winorlose1', 'Victoire');
                            }

                            localStorage.setItem('resultat3', localStorage.getItem('resultat2'));
                            localStorage.setItem('winorlose3', localStorage.getItem('winorlose2'));
                            localStorage.setItem('resultat2', localStorage.getItem('resultat1'));
                            localStorage.setItem('winorlose2', localStorage.getItem('winorlose1'));
                            localStorage.setItem('resultat1', ''+joueur.score+':'+ordi.score+'');
                        }
                    }

                    partie = 0;
                }
            }
        }
        else {
            document.querySelector("#compte-rebours p").textContent = jeu.compteRebours;
        }
    }

    //Affiche pierre s'il est cliqué dans l'intervalle et l'ajoute en choix
    pierre.onclick = function () {
        if(document.querySelector("#compte-rebours p").textContent === "1"
        || document.querySelector("#compte-rebours p").textContent === "2"
        || document.querySelector("#compte-rebours p").textContent === "3"
        || document.querySelector("#compte-rebours p").textContent === ""){
            joueur.choix = 0;
            mainJoueur.src = "img/Pierre-main.svg";
        }
    };

    //Affiche feuille s'il est cliqué dans l'intervalle et l'ajoute en choix
    feuille.onclick = function () {
        if(document.querySelector("#compte-rebours p").textContent === "1"
            || document.querySelector("#compte-rebours p").textContent === "2"
            || document.querySelector("#compte-rebours p").textContent === "3"
            || document.querySelector("#compte-rebours p").textContent === ""){
            joueur.choix = 1;
            mainJoueur.src = "img/Feuille-main.svg";
        }
    };

    //Affiche ciseaux s'il est cliqué dans l'intervalle et l'ajoute en choix
    ciseaux.onclick = function () {
        if(document.querySelector("#compte-rebours p").textContent === "1"
            || document.querySelector("#compte-rebours p").textContent === "2"
            || document.querySelector("#compte-rebours p").textContent === "3"
            || document.querySelector("#compte-rebours p").textContent === ""){
            joueur.choix = 2;
            mainJoueur.src = "img/Ciseaux-main.svg";
        }
    };

    setTimeout(momentChoixOrdi, 4000);
    setTimeout(momentChoixJoueur, 4000);
    var compteur = setInterval(timer,1000);

    //Relance une manche sans perdre les scores
    rejouer.onclick = function () {
        joueur.choix = "";
        ordi.choix = "";
        mainJoueur.src = "";
        mainOrdi.src = "";
        rejouer.className = rejouer.className.replace("visible", "");
        jeu.compteRebours = 0;
        jeu.gagnant = "";
        document.querySelector("#compte-rebours p").textContent = "";

        setTimeout(momentChoixOrdi, 4000);
        setTimeout(momentChoixJoueur, 4000);
        compteur = setInterval(timer,1000);
    }
};

//Affiche les règles au survol
document.getElementById('regles').onmouseover = function () {
    document.getElementById('textes-regles').className = "visible-flex";
};

document.getElementById('regles').onmouseout = function () {
    document.getElementById('textes-regles').className = document.getElementById('textes-regles').className.replace("visible-flex", "");
};
