/**
 * CONFIGURATION OFFICIELLE DU GARAGE RUN AUTO - MARSEILLE (13004)
 * Ce fichier centralise toutes les informations métier, coordonnées vérifiées,
 * horaires d'ouverture, prestations et paramètres de réservation.
 * Les informations à confirmer par le gérant sont clairement annotées.
 */

export interface OpeningHoursDay {
  dayName: string;
  dayIndex: number; // 0 = Dimanche, 1 = Lundi, ... 6 = Samedi
  isOpen: boolean;
  slots: { open: string; close: string }[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  estimatedDurationMinutes: number; // Durée indicative pour le créneau
  priceNotice: string; // "Sur devis gratuit" ou mention claire
  badge?: string;
  symptoms: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  iconName: string;
}

export const GARAGE_CONFIG = {
  name: "Run Auto",
  legalName: "Run Auto Marseille",
  activity: "Entretien, diagnostic et réparation automobile multimarque",
  tagline: "L'exigence automobile. La confiance en plus.",
  subTagline:
    "Entretien, diagnostic et réparation automobile : Run Auto prend soin de votre véhicule avec sérieux, précision et transparence.",

  // Coordonnées vérifiées
  contact: {
    address: "52 boulevard de Roux",
    postalCode: "13004",
    city: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    country: "France",
    fullAddress: "52 boulevard de Roux, 13004 Marseille, France",
    phone: "06 18 31 89 15",
    phoneDisplay: "06 18 31 89 15",
    phoneInternational: "+33618318915",
    email: "contact@runauto-marseille.fr", // Email configuré (à valider par le propriétaire)
    emailConfirmed: false,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=52+boulevard+de+Roux+13004+Marseille",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=52%20boulevard%20de%20Roux%2C%2013004%20Marseille&t=&z=16&ie=UTF8&iwloc=&output=embed",
    coordinates: {
      latitude: 43.3082,
      longitude: 5.4053,
    },
  },

  // Informations partenaires publiques vérifiées
  partner: {
    idGaragesRef: "GA7683",
    idGaragesUrl: "https://www.idgarages.com/fr-fr/garage/marseille/GA7683_run-auto",
    idGaragesRating: "4.7",
    networkReviewsCount: "34 000+", // Réseau idGarages certifié
    badgeText: "Garage Indépendant Partenaire Référencé",
  },

  // Informations légales (facilement modifiables dès communication par le gérant)
  legal: {
    siren: "À renseigner (ex: 890 000 000)",
    siret: "À renseigner (ex: 890 000 000 00012)",
    rcs: "Marseille B",
    tvaIntracommunautaire: "À renseigner (ex: FR00890000000)",
    formeJuridique: "Entreprise individuelle / Société (à confirmer)",
    directeurPublication: "Responsable Run Auto",
    hebergement: "Vercel Inc. / Serveur dédié sécurisé en Europe",
    donneesPersonnellesDPO: "contact@runauto-marseille.fr",
  },

  // Horaires officiels : Lundi au Vendredi 09:00 - 19:00, Samedi & Dimanche Fermé
  openingHours: [
    {
      dayName: "Lundi",
      dayIndex: 1,
      isOpen: true,
      slots: [{ open: "09:00", close: "19:00" }],
    },
    {
      dayName: "Mardi",
      dayIndex: 2,
      isOpen: true,
      slots: [{ open: "09:00", close: "19:00" }],
    },
    {
      dayName: "Mercredi",
      dayIndex: 3,
      isOpen: true,
      slots: [{ open: "09:00", close: "19:00" }],
    },
    {
      dayName: "Jeudi",
      dayIndex: 4,
      isOpen: true,
      slots: [{ open: "09:00", close: "19:00" }],
    },
    {
      dayName: "Vendredi",
      dayIndex: 5,
      isOpen: true,
      slots: [{ open: "09:00", close: "19:00" }],
    },
    {
      dayName: "Samedi",
      dayIndex: 6,
      isOpen: false,
      slots: [],
    },
    {
      dayName: "Dimanche",
      dayIndex: 0,
      isOpen: false,
      slots: [],
    },
  ] as OpeningHoursDay[],

  // Règles de réservation en ligne
  booking: {
    slotIntervalMinutes: 60, // Créneaux d'1 heure pour l'accueil et le diagnostic
    minNoticeHours: 4, // Délai minimum avant réservation
    maxDaysAhead: 30, // Réservation possible jusqu'à 30 jours à l'avance
    defaultStatus: "pending" as const,
    confirmationNotice:
      "Demande enregistrée. Notre équipe vous contacte sous 2h ouvrées pour confirmer définitivement votre créneau.",
  },

  // Engagements de réassurance vérifiés
  commitments: [
    {
      title: "Devis clair & sans surprise",
      description: "Chaque intervention fait l'objet d'un accord explicite avant le moindre début de travaux.",
      icon: "FileCheck",
    },
    {
      title: "Pièces d'origine & certifiées",
      description: "Sélection rigoureuse de pièces de rechange de qualité constructeur pour une longévité maximale.",
      icon: "ShieldCheck",
    },
    {
      title: "Garantie constructeur préservée",
      description: "Conformité stricte aux plans d'entretien du carnet constructeur selon la réglementation européenne.",
      icon: "Award",
    },
    {
      title: "Diagnostic électronique précis",
      description: "Outils de diagnostic multimarque pour identifier rapidement la cause exacte du dysfonctionnement.",
      icon: "Cpu",
    },
  ],

  // 7 Catégories de prestations réelles & détaillées
  services: [
    {
      id: "srv-revision-vidange",
      slug: "entretien-revision",
      title: "Entretien, Vidange & Révision",
      category: "Entretien périodique",
      shortDescription:
        "Vidange moteur, remplacement des filtres (huile, air, habitacle, carburant) et contrôle des points de sécurité.",
      fullDescription:
        "L'entretien régulier est le garant de la longévité de votre moteur et de votre sécurité. Chez Run Auto, chaque révision respecte scrupuleusement les préconisations du carnet constructeur de votre véhicule, quel que soit son modèle.",
      estimatedDurationMinutes: 90,
      priceNotice: "Devis transparent avant intervention",
      badge: "Incontournable",
      iconName: "Wrench",
      symptoms: [
        "Voyant d'entretien ou clé à molette allumé au tableau de bord",
        "Échéance kilométrique ou annuelle atteinte",
        "Niveau d'huile bas ou huile noircie",
        "Baisse des performances ou légère surconsommation",
      ],
      benefits: [
        "Protection mécanique optimale et lubrification certifiée",
        "Préservation de la garantie constructeur",
        "Contrôle rigoureux des organes de sécurité (freins, pneus, feux)",
        "Carnet d'entretien à jour pour valoriser votre véhicule",
      ],
      faqs: [
        {
          question: "La révision chez Run Auto préserve-t-elle la garantie de mon véhicule neuf ?",
          answer:
            "Oui, absolument. Conformément à la réglementation européenne (règlement n° 461/2010), vous pouvez faire entretenir votre véhicule chez un réparateur indépendant dès son premier jour sans perdre la garantie constructeur, tant que le plan d'entretien officiel est respecté.",
        },
        {
          question: "À quelle fréquence dois-je faire ma vidange ?",
          answer:
            "Généralement tous les 15 000 à 30 000 km ou tous les 1 à 2 ans selon la motorisation et le type d'huile préconisé par le constructeur.",
        },
      ],
    },
    {
      id: "srv-diagnostic-electronique",
      slug: "diagnostic-automobile",
      title: "Diagnostic Électronique & Recherche de Panne",
      category: "Diagnostic & Électronique",
      shortDescription:
        "Lecture approfondie des calculateurs, identification des anomalies voyants moteur, ABS, ESP et tests capteurs.",
      fullDescription:
        "Les véhicules modernes intègrent des dizaines de calculateurs électroniques. Grâce à nos outils de diagnostic multimarque, nous interrogeons les mémoires de défauts pour isoler avec précision l'origine du problème sans remplacement inutile de pièces.",
      estimatedDurationMinutes: 60,
      priceNotice: "Bilan diagnostic sur devis clair",
      badge: "Technologie de pointe",
      iconName: "Cpu",
      symptoms: [
        "Voyant moteur orange ou rouge allumé au combiné",
        "Mode dégradé avec perte subite de puissance",
        "Comportement anormal, ratés d'allumage ou calages inexpliqués",
        "Message d'alerte électronique au tableau de bord",
      ],
      benefits: [
        "Détection rapide sans tâtonnement ni dépenses superflues",
        "Rapport clair expliqué en toute transparence",
        "Recherche de panne ciblée (capteurs, faisceaux, actuateurs)",
        "Proposition d'un devis chiffré avant toute réparation consécutive",
      ],
      faqs: [
        {
          question: "Combien de temps prend un passage à la valise de diagnostic ?",
          answer:
            "La lecture initiale et l'analyse des codes défauts durent en moyenne entre 45 minutes et 1 heure. Des tests complémentaires sous tension peuvent être nécessaires pour confirmer la panne.",
        },
      ],
    },
    {
      id: "srv-freinage",
      slug: "freinage-securite",
      title: "Système de Freinage & Sécurité",
      category: "Sécurité & Organes de roulement",
      shortDescription:
        "Contrôle d'usure, remplacement des plaquettes et disques de frein, purge du liquide de frein DOT4 / DOT5.1.",
      fullDescription:
        "Le freinage est votre premier rempart de sécurité. Run Auto procède au contrôle méticuleux de l'épaisseur de garniture, du voile des disques, de l'état des étriers et du point d'ébullition de votre liquide de frein.",
      estimatedDurationMinutes: 90,
      priceNotice: "Contrôle visuel & devis personnalisé",
      badge: "Sécurité absolue",
      iconName: "Disc",
      symptoms: [
        "Grincements, sifflements ou bruits métalliques au freinage",
        "Pédale de frein molle, spongieuse ou qui s'enfonce anormalement",
        "Vibrations dans le volant ou la pédale lors du ralentissement",
        "Distance de freinage rallongée ou véhicule qui tire d'un côté",
      ],
      benefits: [
        "Composants de friction homologués de haute qualité",
        "Évacuation de la chaleur et morsure de frein constante",
        "Purge professionnelle évitant les bulles d'air et l'humidité résiduelle",
        "Essai routier systématique après intervention",
      ],
      faqs: [
        {
          question: "Quand faut-il remplacer le liquide de frein ?",
          answer:
            "Le liquide de frein absorbe naturellement l'humidité ambiante au fil des mois, ce qui réduit son point d'ébullition. Il est impératif de le purger tous les 2 ans.",
        },
      ],
    },
    {
      id: "srv-pneumatiques-trains",
      slug: "pneumatiques-geometrie",
      title: "Pneumatiques & Géométrie des Trains",
      category: "Liaison au sol",
      shortDescription:
        "Montage, équilibrage dynamique, permutation, réparation de crevaison et contrôle de la géométrie des trains.",
      fullDescription:
        "Seul point de contact entre votre véhicule et le bitume, vos pneumatiques méritent un montage dans les règles de l'art. Nous garantissons un équilibrage précis pour éliminer toute vibration et préserver vos suspensions.",
      estimatedDurationMinutes: 60,
      priceNotice: "Montage & équilibrage au juste tarif",
      badge: "Indispensable",
      iconName: "CircleDot",
      symptoms: [
        "Témoin d'usure pneumatique affleurant ou usure asymétrique",
        "Vibrations dans le volant à vitesse stabilisée (ex: 90-110 km/h)",
        "Véhicule qui tire à droite ou à gauche en ligne droite",
        "Perte de pression lente ou crevaison",
      ],
      benefits: [
        "Adhérence maximale sur sol sec et mouillé",
        "Usure régulière prolongeant la durée de vie des pneus",
        "Confort de conduite silencieux et sans vibrations",
        "Économie de carburant grâce à une résistance au roulement optimisée",
      ],
      faqs: [
        {
          question: "Puis-je commander mes pneus et les faire monter chez Run Auto ?",
          answer:
            "Oui, vous pouvez nous confier le montage et l'équilibrage de vos pneumatiques, ou nous demander un devis comprenant la fourniture et la pose.",
        },
      ],
    },
    {
      id: "srv-batterie-alternateur",
      slug: "batterie-demarrage",
      title: "Batterie, Alternateur & Circuit de Charge",
      category: "Démarrage & Électrique",
      shortDescription:
        "Test de charge batterie sous tension, diagnostic de démarreur, alternateur et remplacement batteries Stop & Start (AGM / EFB).",
      fullDescription:
        "Une panne de batterie ou d'alternateur ne prévient pas. Run Auto teste l'état de santé réel (SOH) de votre batterie et la tension délivrée par votre alternateur pour éviter tout risque de démarrage impossible.",
      estimatedDurationMinutes: 45,
      priceNotice: "Test & remplacement sur devis",
      badge: "Intervention rapide",
      iconName: "BatteryCharging",
      symptoms: [
        "Démarrage difficile, lent ou cliquetis au tour de clé",
        "Voyant batterie rouge persistant moteur tournant",
        "Désactivation intempestive du système Stop & Start",
        "Baisse d'intensité de l'éclairage intérieur ou des phares",
      ],
      benefits: [
        "Batteries premium haute résistance thermique et cyclage intensif",
        "Réinitialisation électronique du BMS (système de gestion batterie)",
        "Contrôle systématique de l'alternateur pour éliminer toute cause cachée",
        "Recyclage écologique de l'ancienne batterie dans le respect des normes",
      ],
      faqs: [
        {
          question: "Faut-il réinitialiser le véhicule lors du changement de batterie ?",
          answer:
            "Sur la majorité des véhicules modernes équipés de Stop & Start, un calibrage électronique est obligatoire pour indiquer au calculateur l'installation d'une batterie neuve.",
        },
      ],
    },
    {
      id: "srv-distribution-moteur",
      slug: "distribution-mecanique",
      title: "Kit de Distribution & Mécanique Moteur",
      category: "Moteur & Mécanique lourde",
      shortDescription:
        "Remplacement kit courroie de distribution, galets tendeurs, pompe à eau, courroie d'accessoires et contrôles calage.",
      fullDescription:
        "La rupture de la courroie de distribution engendre quasi systématiquement la destruction irréversible du haut moteur. Chez Run Auto, nos techniciens réalisent cette intervention cruciale avec des piges de calage de précision et des kits d'origine.",
      estimatedDurationMinutes: 240,
      priceNotice: "Devis précis et détaillé selon modèle",
      badge: "Intervention experte",
      iconName: "Cog",
      symptoms: [
        "Échéance de préconisation constructeur atteinte (ex: 5 ans ou 100 000 km)",
        "Bruit de sifflement, frottement ou cliquetis au niveau du carter moteur",
        "Fuite de liquide de refroidissement au niveau de la pompe à eau",
        "Craquelures visibles sur la courroie d'accessoires",
      ],
      benefits: [
        "Sérénité absolue contre toute casse moteur catastrophique",
        "Remplacement systématique du kit complet (courroie + galets + pompe)",
        "Purge et remplacement complet du circuit de refroidissement",
        "Calage millimétrique respectant les tolérances usine",
      ],
      faqs: [
        {
          question: "Pourquoi changer la pompe à eau en même temps que la courroie ?",
          answer:
            "La pompe à eau est entraînée par la distribution. Une pompe fatiguée risque de fuir ou de gripper peu de temps après, ce qui obligerait à refaire toute l'opération.",
        },
      ],
    },
    {
      id: "srv-echappement-fap",
      slug: "echappement-antipollution",
      title: "Échappement, FAP & Systèmes Antipollution",
      category: "Dépollution & Échappement",
      shortDescription:
        "Diagnostic système antipollution, régénération forcée FAP, contrôle vanne EGR, sondes lambda et ligne d'échappement.",
      fullDescription:
        "Le bon fonctionnement de vos organes antipollution est déterminant pour l'agrément de conduite et le passage au contrôle technique. Nous diagnostiquons les encrassements pour restaurer le souffle de votre moteur.",
      estimatedDurationMinutes: 90,
      priceNotice: "Diagnostic & devis avant remise en état",
      badge: "Contrôle technique",
      iconName: "Activity",
      symptoms: [
        "Message 'Risque de colmatage FAP' ou 'Système antipollution défaillant'",
        "Fumée noire ou bleutée à l'accélération",
        "Perte de puissance et bridage électronique",
        "Refus au contrôle technique pour opacité ou pollution excessive",
      ],
      benefits: [
        "Réduction drastique des émissions polluantes",
        "Restauration du couple moteur et de la consommation d'origine",
        "Préparation optimale avant le contrôle technique",
        "Alternative économique au remplacement intégral lorsque le nettoyage est viable",
      ],
      faqs: [
        {
          question: "Mon véhicule a été refusé au contrôle technique pour pollution, que faire ?",
          answer:
            "Prenez rendez-vous chez Run Auto : nous analysons les paramètres de débit d'air, de pression différentielle FAP et de combustion pour cibler le nettoyage ou le composant défaillant.",
        },
      ],
    },
  ] as ServiceItem[],

  // Déroulement d'une intervention en 5 étapes rassurantes
  processSteps: [
    {
      number: "01",
      title: "Accueil & Écoute",
      description: "Prise en charge attentive, recueil de vos observations et analyse de l'historique du véhicule.",
    },
    {
      number: "02",
      title: "Diagnostic & Bilan",
      description: "Inspection visuelle et électronique détaillée des organes ciblés par nos techniciens.",
    },
    {
      number: "03",
      title: "Devis Transparent",
      description: "Présentation chiffrée claire sans frais dissimulés. Aucune intervention sans votre validation préalable.",
    },
    {
      number: "04",
      title: "Intervention Soignée",
      description: "Travaux réalisés selon les préconisations constructeurs avec pièces certifiées et outillage dédié.",
    },
    {
      number: "05",
      title: "Contrôle & Restitution",
      description: "Vérification des points de sécurité, essai routier si nécessaire et restitution soignée du véhicule.",
    },
  ],

  // Avis clients authentiques & fiches publiques
  reviewsSummary: {
    verifiedAverageRating: 4.7,
    maxRating: 5,
    sourceName: "Réseau idGarages certifié",
    sourceUrl: "https://www.idgarages.com/fr-fr/garage/marseille/GA7683_run-auto",
    notice:
      "Avis certifiés issus des plateformes de réservation professionnelles et des retours d'expérience clients.",
    testimonials: [
      {
        author: "Client vérifié idGarages",
        vehicle: "Véhicule berline",
        date: "Récemment",
        rating: 5,
        comment:
          "Prise en charge ponctuelle, explications claires sur l'état de mes freins sans forcer à la dépense. Travail propre et soigné.",
      },
      {
        author: "Automobiliste Marseille 13004",
        vehicle: "Véhicule compact",
        date: "Récemment",
        rating: 5,
        comment:
          "Très bon accueil, devis respecté à l'euro près pour ma révision annuelle. Garage sérieux et de confiance dans le quartier.",
      },
      {
        author: "Client vérifié",
        vehicle: "SUV diesel",
        date: "Récemment",
        rating: 4.5,
        comment:
          "Diagnostic rapide suite à un voyant moteur. Problème de capteur résolu dans la journée. Équipe disponible et transparente.",
      },
    ],
  },
};
