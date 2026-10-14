# CALAME – قَلَم — Exigences

Sources : « Questions Wassim et Réponses.pdf » (12/10/2026, référence métier principale), logo CALAME.
Le PDF « FORMATION EN ARABE EN TROIS MOIS » est **introuvable** : les textes de programme, méthode, objectifs et professeurs sont des contenus provisoires marqués « À valider par le responsable de CALAME ».

## 1. Exigences confirmées
- Formation en arabe à distance, 3 mois, 6 h/semaine (72 h), prix 430 €, paiement en 1, 2 ou 3 fois, une seule formule.
- Public : adolescents proches de la majorité (≥ 15 ans) et adultes.
- Langue du site : français uniquement ; zones d'écriture arabe en RTL.
- Parcours : visite → rendez-vous → test de niveau (oral + écrit, visio, ~30 min) → validation du niveau par l'administration pédagogique → création du compte par l'administration → paiement → accès.
- Niveaux A / B / C (définitions du client, pas de CECRL).
- ~30 élèves, 3 professeurs, 10–12 élèves max par classe, un élève = une classe, un professeur = une classe.
- Classes organisées par niveau et par professeur.
- Visio intégrée : caméra, micro, chat, partage d'écran, tableau, coupure des micros, main levée, partage de fichiers, 10–12 élèves + professeur, mobile.
- Exercices : QCM, réponses écrites, textes à compléter, lecture, audio, dépôt de fichiers ; interactifs ; date limite ; correction **manuelle uniquement** ; consultation de la copie corrigée.
- Appréciations qualitatives (pas de notes, coefficients ni moyennes). Évaluation finale à 3 mois.
- Présences, absences, durée, temps sur exercices, historique, taux d'assiduité. Professeur : lecture seule, signalement à l'administration.
- Ressources : PDF, images, vidéos, audio, Word ; organisées par séance/chapitre/niveau ; ajoutées par l'administration seulement.
- Bibliothèque culturelle privée (élèves actifs + professeurs), recherche, sans catégories obligatoires, gérée par l'administration pédagogique.
- Messagerie élève ↔ professeur, professeur ↔ administration ; pas de message collectif.
- Notifications plateforme + email : nouveau cours, cours annulé, rappel, nouvel exercice, travail bientôt à rendre, travail corrigé, nouveau message, paiement réussi/échoué, fin prochaine.
- Fin de formation : perte d'accès aux documents et à la bibliothèque ; suite « à voir ».
- Tableau « écriture type Word » pour les professeurs (éditeur de texte riche RTL).

## 2. Rôles
| Rôle | Résumé |
|---|---|
| `admin` | Tout gérer depuis un tableau de bord unique |
| `teacher` | Sa classe : visio, élèves, présences (lecture), corrections, appréciations, messages, description/documents/lien de ses séances |
| `student` | Ses données uniquement, accès conditionné au paiement et à la période de formation |

Le questionnaire répond « Non » à « plusieurs niveaux de permissions » ; trois rôles sont néanmoins implémentés car les responsabilités diffèrent (consigne du cahier des charges).

## 3. Ambiguïtés et décisions (réversibles)
| Point | Contradiction | Décision par défaut |
|---|---|---|
| Connexion | « Pas de mot de passe » mais « récupération de mot de passe » | Lien magique / code OTP par email, sans mot de passe. Couvre vérification d'email et récupération. |
| Accès paiement fractionné | Non précisé | Paramètre `access_rule` : `first_installment` (défaut) ou `full_payment`. Échéance échouée → suspension configurable. |
| Notif. modification de cours | « Non » (item) vs « Oui » (modifié ou annulé) | Pas de notification de modification ; option `notify_session_update` désactivée par défaut. |
| Professeur et planning | « Non » créer/modifier/déplacer/annuler ; « Oui » description, documents, lien | Le professeur modifie uniquement description/documents/lien de ses séances ; jamais date, heure, état. |
| Professeur et évaluations | « Oui » créer des évaluations | Appréciations qualitatives seulement, pas de notes. |
| Enregistrement des cours | Case cochée sans confirmation | Désactivé par défaut (`recording_enabled=false`). |
| Page « Inscription » | Comptes créés par l'administration | Remplacée par « Prendre rendez-vous » + page d'activation par invitation. |
| Partie culturelle publique | Listée en page publique mais « uniquement élèves et profs » | Privée, authentification requise. |
| Mention « Nous prenons des jeunes majeurs ou presque et au-delà » | vs âge minimum 15 | Âge min. 15 ans (paramétrable). |
| Autre moyen de paiement (« autre ») | Non précisé | À confirmer. |
| Suppression des données | Non précisé | Aucune suppression automatique ; durées de conservation à valider. |

## 4. Points à confirmer par le responsable
1. PDF de présentation à fournir (programme, méthode, objectifs, professeurs).
2. Règle d'accès en paiement fractionné (voir ci-dessus).
3. PayPal : compte PayPal Business et intégration séparée (non incluse dans Stripe Checkout, voir `docs/payments.md`).
4. Notification de modification de cours.
5. Politique de remboursement, CGV, confidentialité, mentions légales (textes provisoires, non validés juridiquement).
6. Durée de conservation des données ; autorisation parentale pour les mineurs.
7. Droits d'usage du manuel *Al-Arabiyyah Bayna Yadayk* (aucun contenu protégé n'est livré).
8. Renouvellement / formation suivante.
9. Enregistrement des cours.
10. Fuseau et horaires officiels des séances.

## 5. Critères de validation
Voir `docs/implementation-plan.md` (critères par étape) et `npm test`.
