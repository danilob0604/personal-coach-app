export type Language = 'it' | 'en' | 'es';

export interface Translations {
  nav: {
    systemTag: string;
    subTitle: string;
    coachCockpit: string;
    athleteHUD: string;
    tier: string;
    slots: string;
    desktopView: string;
    tabletView: string;
    mobileView: string;
    settings: string;
    coachRole: string;
    athleteRole: string;
  };
  settings: {
    title: string;
    subtitle: string;
    closeTitle: string;
    closeBtn: string;
    appLanguage: string;
    current: string;
    langDescription: string;
    activeBadge: string;
    langUpdated: string;
    soundTitle: string;
    soundDescription: string;
    soundEnable: string;
    soundDisable: string;
    soundTestTitle: string;
    soundPlayBtn: string;
    soundPlayedToast: string;
    devicesTitle: string;
    wifiLocal: string;
    sseActive: string;
    devicePhone: string;
    deviceTablet: string;
    openQrBtn: string;
    suiteTitle: string;
    reactiveArch: string;
    languages: {
      itDesc: string;
      itTag: string;
      enDesc: string;
      enTag: string;
      esDesc: string;
      esTag: string;
    };
  };
  connectDevices: {
    title: string;
    subtitle: string;
    syncActive: string;
    networkOk: string;
    closeTitle: string;
    closeBtn: string;
    localWifi: string;
    wifiTip: string;
    port: string;
    phoneTitle: string;
    phoneConsole: string;
    athleteOnly: string;
    phoneDesc: string;
    scanWithCamera: string;
    linkCopied: string;
    copyPhoneLink: string;
    tabletTitle: string;
    tabletConsole: string;
    fullCockpit: string;
    tabletDesc: string;
    copyTabletLink: string;
    syncMagicTitle: string;
    syncMagicDesc: string;
    linkCopiedToast: string;
  };
  trainer: {
    stats: {
      rosterCapacity: string;
      fleetCompliance: string;
      todayMissions: string;
      checksPending: string;
      activeTier: string;
      vsPrev: string;
      doneMissions: string;
      activeInGym: string;
      alertsCount: string;
      postureCheck: string;
      videoAbbr: string;
    };
    tabs: {
      liveFeed: string;
      rosterCRM: string;
      builder: string;
      chat: string;
      athletesShort: string;
      routinesShort: string;
    };
    feed: {
      title: string;
      subTitle: string;
      socketConnected: string;
      checkVideo: string;
      alertCoach: string;
      verifyMark: string;
    };
    crm: {
      gaugeTitle: string;
      allSlotsEngaged: string;
      activeRoster: string;
      upgradeTier: string;
      enrollAthlete: string;
      slotsFull: string;
      availableSlots: string;
      capacityEngaged: string;
      searchPlaceholder: string;
      filterAll: string;
      filterInactive: string;
      filterArchived: string;
      compliance: string;
      today: string;
      daysAgo: string;
      restore: string;
      archive: string;
      modalTitle: string;
      modalSubtitle: string;
      nameLabel: string;
      emailLabel: string;
      weightLabel: string;
      goalLabel: string;
      cancel: string;
      submitEnroll: string;
      dossierBtn: string;
      openDossierTitle: string;
      rosterEnrollment: string;
    };
    builder: {
      generatorTag: string;
      title: string;
      saveAssign: string;
      routineTitleLabel: string;
      exerciseDb: string;
      setCol: string;
      loadCol: string;
      repsCol: string;
      statusCol: string;
      configuredStatus: string;
      addSet: string;
      restLabel: string;
      hubTitle: string;
      hubSubtitle: string;
      hubDesc: string;
      routinesCount: string;
      newRoutineBtn: string;
      searchPlaceholder: string;
      filterAll: string;
      filterWomen: string;
      filterMen: string;
      filterRecomp: string;
      editBtn: string;
      openAssignBtn: string;
      noRoutinesFound: string;
      createNowBtn: string;
      returnToGallery: string;
      saveBtn: string;
      saveAndAssignBtn: string;
      categoryLabel: string;
      weeklyFreqLabel: string;
      targetAnatomyLabel: string;
      targetGoalLabel: string;
      difficultyLabel: string;
      durationLabel: string;
      assignedStatus: string;
      notAssignedYet: string;
      daysDetail: string;
      includedExercises: string;
    };
    chat: {
      activeRoster: string;
      telemetrySynced: string;
      encryptedChannel: string;
      inputPlaceholder: string;
      secureShort: string;
    };
    addAthleteShort: string;
    addRoutineShort: string;
    activeAthletes: string;
  };
  athlete: {
    telemetryTitle: string;
    coachLabel: string;
    streakLabel: string;
    todayProtocol: string;
    estDuration: string;
    initWorkout: string;
    postureCardTitle: string;
    postureCardDesc: string;
    recVideoBtn: string;
    sessionRecording: string;
    doneRatio: string;
    recoveryLabel: string;
    rpeLabel: string;
    coachCue: string;
    setLabel: string;
    prTarget: string;
    concludeSync: string;
    telemetryOnline: string;
    sendVideo: string;
    chatPlaceholder: string;
    missionAccomplished: string;
    protocolCompleted: string;
    syncSuccessDesc: string;
    totalVolume: string;
    newRecord: string;
    returnToHub: string;
    levelLabel: string;
    streakBadge: string;
    expLabel: string;
    pointsLabel: string;
    repsAbbr: string;
    videoGuide: string;
    recordBadge: string;
    routineTab: string;
    checkinTab: string;
    coachTab: string;
    anabolicState: string;
    leanMass: string;
    progressiveOverloadOn: string;
    sessionText: string;
    activeProtocolDescription: string;
    splitSelection: string;
    swipe: string;
    weeklyFreq: string;
    exercises: string;
    scheduledExercises: string;
    sets: string;
    timerUrgent: string;
    timerRest: string;
    startNow: string;
    sub15: string;
    add15: string;
    closeTimer: string;
    coachBadge: string;
    strengthGain: string;
    maxLift: string;
    radarBtn: string;
    // Check-in and Telemetry additions
    checkinTelemetryTitle: string;
    checkinHeroTitle: string;
    checkinHeroDesc: string;
    bodyWeight: string;
    bodyFatPct: string;
    muscleMass: string;
    waistCirc: string;
    totalProgress: string;
    fat: string;
    muscle: string;
    athleteGoal: string;
    autoSyncOn: string;
    anabolicVerdictTitle: string;
    anabolicVerdictBadge: string;
    massIncreasingTitle: string;
    massIncreasingDesc: string;
    pureMuscle: string;
    contractileTissue: string;
    fatLost: string;
    fatDropped: string;
    muscleDensity: string;
    ofYourBody: string;
    metabolicBoost: string;
    burnedAtRest: string;
    coachAnalysisTitle: string;
    coachQuote: string;
    radarTitle: string;
    radarSubtitle: string;
    muscleTrend: string;
    fatTrend: string;
    palmaresTitle: string;
    achievementsTitle: string;
    unlockedRatio: string;
    unlockedBadge: string;
    overloadTitle: string;
    strengthGainTitle: string;
    maxStrengthBadge: string;
    totalStrengthGainBanner: string;
    gained: string;
    strengthGainDesc: string;
    sessionVolume: string;
    keyExercise: string;
    loadProgression: string;
    prevMonth: string;
    today: string;
    directCheckinTitle: string;
    recordMeasurement: string;
    quickCheckinTime: string;
    weightLabelStep: string;
    valueInKg: string;
    waistLabelStep: string;
    waistMeasuredAt: string;
    energyLabelStep: string;
    fatigued: string;
    fullStrength: string;
    sleepQuality: string;
    sleepOptimal: string;
    sleepFair: string;
    sleepPoor: string;
    hydrationYesterday: string;
    hydrationOptimal: string;
    hydrationNormal: string;
    hydrationLow: string;
    notesForCoach: string;
    notesPlaceholder: string;
    sendCheckinBtn: string;
    checkinSuccessToast: string;
    historyTitle: string;
    readingsCount: string;
    clinicalBiaBadge: string;
    selfCheckinBadge: string;
    fatShort: string;
    muscleShort: string;
    waterShort: string;
    waistShort: string;
    strengthGainSummary: string;
    restFor: string;
    resumeWorkout: string;
    pauseWorkout: string;
  };
  restTimer: {
    tag: string;
    targetEx: string;
    atpRecharge: string;
    readyBtn: string;
  };
  upgrade: {
    badge: string;
    title: string;
    desc: string;
    statusTitle: string;
    registeredAthletes: string;
    stripeB2BNotice: string;
    coachFavorite: string;
    activeBadge: string;
    perMonth: string;
    capacityLabel: string;
    upToAthletes: string;
    currentPlanBtn: string;
    upgradeTierBtn: string;
    gatekeeperRule: string;
    closeBtn: string;
  };
  videoModal: {
    tempo: string;
    officialCoachVideo: string;
    demoVideo: string;
    eccentricConcentric: string;
    slowMo: string;
    normalSpeed: string;
    gymClipTitle: string;
    cancel: string;
    customUploadBtn: string;
    customUploadLabel: string;
    customUploadPlaceholder: string;
    save: string;
    customUploadTip: string;
    cuesTitle: string;
    mistakesTitle: string;
    coachNoteTitle: string;
    sendExecutionToCoach: string;
    understoodReturn: string;
  };
  routineModal: {
    focusWomen: string;
    focusMen: string;
    unisexRecomp: string;
    perWeek: string;
    minEstimated: string;
    totalExercises: string;
    goalProtocol: string;
    tabAssign: string;
    tabExercises: string;
    assignTitle: string;
    assignSubtitle: string;
    searchPlaceholder: string;
    currentlyActive: string;
    goalLabel: string;
    todayRoutine: string;
    noRoutine: string;
    splitStructure: string;
    daySingular: string;
    dayPlural: string;
    frequency: string;
    restSeconds: string;
    setsCol: string;
    targetLoadCol: string;
    repsCol: string;
    setTypeCol: string;
    setWord: string;
    prBadge: string;
    standardBadge: string;
    deleteBtn: string;
    editBuilderBtn: string;
    selectedCount: string;
    confirmAssignBtn: string;
    selectAtLeastOneError: string;
    deleteConfirm: string;
  };
  toasts: {
    setDone: string;
    prRecord: string;
    timerDone: string;
    planUpgraded: string;
    athleteAdded: string;
    athleteArchived: string;
    athleteRestored: string;
    routineSaved: string;
    workoutFinished: string;
    reviewedMarked: string;
    slotLimitError: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  it: {
    nav: {
      systemTag: 'PRO SUITE',
      subTitle: 'Gestionale Personal Trainer & App Iscritti',
      coachCockpit: 'Cockpit Coach',
      athleteHUD: 'Console Atleta',
      tier: 'SCAGLIONE',
      slots: 'SLOT',
      desktopView: 'Console Desktop',
      tabletView: 'Console Tablet (iPad)',
      mobileView: 'Smartphone Viewport',
      settings: 'Impostazioni',
      coachRole: 'COACH',
      athleteRole: 'ATLETA'
    },
    settings: {
      title: 'Impostazioni',
      subtitle: 'Lingua, segnali acustici e connessione dispositivi',
      closeTitle: 'Chiudi impostazioni',
      closeBtn: 'Chiudi Impostazioni',
      appLanguage: "Lingua dell'Applicazione",
      current: 'Attuale',
      langDescription: "Configura la lingua dell'interfaccia. L'impostazione viene conservata stabilmente su tutti i tuoi dispositivi.",
      activeBadge: '✓ ATTIVA',
      langUpdated: 'Lingua aggiornata',
      soundTitle: 'Feedback Sonoro & Segnali Acustici',
      soundDescription: 'Segnali acustici per la conferma delle serie, il conto alla rovescia del recupero (Technogym Live) e la celebrazione dei nuovi Record Personali.',
      soundEnable: 'Attiva suoni',
      soundDisable: 'Disattiva suoni',
      soundTestTitle: 'Test Segnale Sonoro Serie',
      soundPlayBtn: 'Riproduci 🔔',
      soundPlayedToast: '🔔 Suono di prova riprodotto',
      devicesTitle: 'Sincronizzazione Dispositivi Fisici',
      wifiLocal: 'Rete Wi-Fi Locale',
      sseActive: 'SSE STREAM ATTIVO',
      devicePhone: '• Smartphone Galaxy A20e (Console Atleta)',
      deviceTablet: '• Tablet Galaxy Tab A 10.1" (Cockpit Coach)',
      openQrBtn: 'Apri QR Code Connessione Rapida',
      suiteTitle: 'Personal Coach Pro Suite',
      reactiveArch: 'v2.4.0 • Architettura Reattiva',
      languages: {
        itDesc: 'Lingua predefinita della piattaforma. Schede, telemetria, video guide e notifiche in italiano.',
        itTag: 'Consigliata',
        enDesc: 'Traduzione completa in inglese, terminologia ed esecuzioni internazionali.',
        enTag: 'Internazionale',
        esDesc: 'Traduzione completa in spagnolo, protocolli e telemetria di allenamento.',
        esTag: 'Spagnolo'
      }
    },
    connectDevices: {
      title: 'Connessione Multi-Dispositivo Android',
      subtitle: "Inquadra i QR Code con la fotocamera per avviare l'app sui tuoi dispositivi fisici collegati al Wi-Fi.",
      syncActive: 'LIVE SYNC ATTIVO',
      networkOk: 'RETE LOCALE OK',
      closeTitle: 'Chiudi',
      closeBtn: 'Ho Capito, Chiudi',
      localWifi: 'Rete Wi-Fi Locale',
      wifiTip: 'Assicurati che Smartphone e Tablet siano connessi alla stessa rete Wi-Fi del computer.',
      port: 'Porta',
      phoneTitle: '1. Smartphone Android',
      phoneConsole: 'CONSOLE UTENTE / ATLETA',
      athleteOnly: 'Solo Atleta',
      phoneDesc: "Configurata per l'uso a una mano in sala pesi: scheda attiva, conferma serie, conto alla rovescia recupero e check-in.",
      scanWithCamera: 'Inquadra con la Fotocamera Android',
      linkCopied: 'Link Copiato!',
      copyPhoneLink: 'Copia Link Smartphone',
      tabletTitle: '2. Tablet Android',
      tabletConsole: 'COACH & ATLETA (ENTRAMBI)',
      fullCockpit: 'Cockpit Completo',
      tabletDesc: 'Schermo panoramico: Feed Live, CRM Atleti, Workout Builder, Chat e tasto rapido in alto per passare istantaneamente ad Atleta.',
      copyTabletLink: 'Copia Link Tablet',
      syncMagicTitle: 'Magia della Sincronizzazione dal Vivo:',
      syncMagicDesc: "Quando l'atleta tocca la spunta verde sullo Smartphone per confermare una serie o invia un check-in, il Tablet riceverà istantaneamente la notifica nel Feed Live e aggiornerà i progressi senza ricaricare la pagina!",
      linkCopiedToast: '📋 Link copiato!'
    },
    trainer: {
      stats: {
        rosterCapacity: 'CAPIENZA ATLETI',
        fleetCompliance: 'ADERENZA ATLETI',
        todayMissions: 'ALLENAMENTI OGGI',
        checksPending: 'CHECK IN SOSPESO',
        activeTier: 'SCAGLIONE ATTIVO',
        vsPrev: '+4.1% RISPETTO AL MESE SCORSO',
        doneMissions: 'COMPLETATI',
        activeInGym: '2 ATLETI ORA IN PALESTRA',
        alertsCount: 'SEGNALAZIONI',
        postureCheck: '1 VIDEO CONTROLLO POSTURA',
        videoAbbr: 'video'
      },
      tabs: {
        liveFeed: 'LIVE FEED TELEMETRICO',
        rosterCRM: 'GESTIONE ATLETI & SLOT',
        builder: 'SCHEDE & MODELLI',
        chat: 'VIDEO CHECK & CHAT',
        athletesShort: 'Atleti',
        routinesShort: 'Schede'
      },
      feed: {
        title: 'FLUSSO TELEMETRICO IN TEMPO REALE',
        subTitle: 'Notifiche istantanee: carichi registrati, record battuti e video da verificare',
        socketConnected: 'STREAM ATTIVO',
        checkVideo: 'GUARDA VIDEO',
        alertCoach: 'INVIA AVVISO',
        verifyMark: 'Segna come verificato'
      },
      crm: {
        gaugeTitle: 'INDICATORE CAPIENZA SCAGLIONE:',
        allSlotsEngaged: 'TUTTI GLI SLOT OCCUPATI',
        activeRoster: 'ATLETI ATTIVI REGISTRATI',
        upgradeTier: 'PASSA DI SCAGLIONE',
        enrollAthlete: '+ AGGIUNGI ATLETA',
        slotsFull: 'SLOT ESAURITI (SBLOCCA)',
        availableSlots: 'SLOT DISPONIBILI',
        capacityEngaged: 'CAPIENZA PACCHETTO UTILIZZATA',
        searchPlaceholder: 'Cerca atleta per nome o email...',
        filterAll: 'ATTIVI',
        filterInactive: 'INATTIVI (>4GG)',
        filterArchived: 'ARCHIVIO',
        compliance: 'CONFORMITÀ:',
        today: 'OGGI',
        daysAgo: 'GG FA',
        restore: 'RIPRISTINA',
        archive: 'Archivia atleta per liberare uno slot',
        modalTitle: 'Iscrivi Nuovo Atleta',
        modalSubtitle: "Il cliente accederà all'app gratuitamente collegandosi al tuo codice coach.",
        nameLabel: 'Nome e Cognome',
        emailLabel: 'Indirizzo Email',
        weightLabel: 'Peso Corporeo (kg)',
        goalLabel: 'Obiettivo Principale',
        cancel: 'Annulla',
        submitEnroll: 'Salva & Assegna Slot',
        dossierBtn: 'Cartella',
        openDossierTitle: 'Apri Cartella Anagrafica & Recupero',
        rosterEnrollment: 'ISCRIZIONE ROSTER'
      },
      builder: {
        generatorTag: 'GENERATORE PROTOCOLLI V2.0',
        title: 'BUILDER RAPIDO SCHEDE',
        saveAssign: 'SALVA ED ASSEGNA PROTOCOLLO',
        routineTitleLabel: 'TITOLO SCHEDA / PROTOCOLLO',
        exerciseDb: 'LIBRERIA ESERCIZI',
        setCol: 'SERIE',
        loadCol: 'CARICO SUGGERITO',
        repsCol: 'RIP. TARGET',
        statusCol: 'STATO',
        configuredStatus: 'ATTIVA',
        addSet: '+ AGGIUNGI SERIE',
        restLabel: 'RECUPERO:',
        hubTitle: 'HUB SCHEDE DI ALLENAMENTO & MODELLI',
        hubSubtitle: 'Gestione & Assegnazione Schede 1-to-1',
        hubDesc: 'Visualizza tutte le schede create, creane di nuove e aprilo singolarmente per decidere a chi assegnarle.',
        routinesCount: 'Schede',
        newRoutineBtn: '+ Nuova Scheda',
        searchPlaceholder: 'Cerca per nome o muscolo...',
        filterAll: 'Tutte',
        filterWomen: '🌸 Donna',
        filterMen: '⚡ Uomo',
        filterRecomp: '🌐 Recomp',
        editBtn: 'Modifica',
        openAssignBtn: 'Apri & Assegna',
        noRoutinesFound: 'Nessuna scheda trovata',
        createNowBtn: '+ Crea una nuova scheda adesso',
        returnToGallery: '← Torna alla Libreria Schede',
        saveBtn: 'Salva',
        saveAndAssignBtn: 'Salva & Assegna',
        categoryLabel: 'Categoria Scheda',
        weeklyFreqLabel: 'Frequenza Settimanale',
        targetAnatomyLabel: 'Target Anatomico',
        targetGoalLabel: 'Obiettivo Target',
        difficultyLabel: 'Livello Difficoltà',
        durationLabel: 'Minuti Stimati',
        assignedStatus: 'Stato Assegnazione:',
        notAssignedYet: '⚪ Non ancora assegnata',
        daysDetail: 'Dettaglio Giornate',
        includedExercises: 'Esercizi Inclusi'
      },
      chat: {
        activeRoster: 'ATLETA ATTIVO',
        telemetrySynced: 'SINCRONIZZATO 10 MIN FA',
        encryptedChannel: 'CANALE DIRETTO CRITTOGRAFATO',
        inputPlaceholder: 'Invia correzioni posturali, note tecniche o feedback sui carichi...',
        secureShort: 'Sicura'
      },
      addAthleteShort: '+ Atleta',
      addRoutineShort: '+ Scheda',
      activeAthletes: 'Atleti Attivi'
    },
    athlete: {
      telemetryTitle: 'TELEMETRIA ATLETA',
      coachLabel: 'COACH:',
      streakLabel: 'SERIE ATTIVA',
      todayProtocol: 'PROTOCOLLO DI OGGI',
      estDuration: 'STIMA',
      initWorkout: 'AVVIA ALLENAMENTO ORA',
      postureCardTitle: 'Verifica Postura & Alzata',
      postureCardDesc: "Invia un video dell'esecuzione per correggere la tecnica col coach",
      recVideoBtn: 'REGISTRA VIDEO',
      sessionRecording: 'REGISTRAZIONE SERIE ATTIVA',
      doneRatio: 'COMPLETATO',
      recoveryLabel: 'RECUPERO:',
      rpeLabel: 'RPE TARGET',
      coachCue: 'INDICAZIONE COACH:',
      setLabel: 'SERIE',
      prTarget: 'RECORD PERSONALE',
      concludeSync: 'CONCLUDI E SINCRONIZZA SESSIONE',
      telemetryOnline: 'COACH ONLINE',
      sendVideo: 'INVIA VIDEO',
      chatPlaceholder: 'Scrivi un messaggio al Coach...',
      missionAccomplished: 'MISSIONE COMPIUTA',
      protocolCompleted: 'ALLENAMENTO COMPLETATO!',
      syncSuccessDesc: 'I dati sono stati sincronizzati e il tuo Coach Alessandro ha ricevuto il report nel Live Feed.',
      totalVolume: 'TONNELLAGGIO TOTALE',
      newRecord: 'NUOVO RECORD',
      returnToHub: 'TORNA ALLA HOME',
      levelLabel: 'LIVELLO',
      streakBadge: '3 Sett. Costanza',
      expLabel: 'ESPERIENZA',
      pointsLabel: 'PUNTI',
      repsAbbr: 'RIP.',
      videoGuide: 'Video Guida',
      recordBadge: 'RECORD',
      routineTab: 'Scheda',
      checkinTab: 'Check-in',
      coachTab: 'Coach',
      anabolicState: 'STATO ANABOLICO: +{val}KG MASSA MAGRA 🔥',
      leanMass: 'MASSA MAGRA',
      progressiveOverloadOn: 'Sovraccarico progressivo su',
      sessionText: 'Sessione:',
      activeProtocolDescription: 'Scheda attiva con sovraccarico progressivo e recupero RPE calibrato dal Personal Coach.',
      splitSelection: 'SELEZIONE SPLIT',
      swipe: 'SCORRI ➔',
      weeklyFreq: 'x/sett.',
      exercises: 'esercizi',
      scheduledExercises: 'Esercizi in programma',
      sets: 'serie',
      timerUrgent: '⚠️ PREPARATI!',
      timerRest: 'RECUPERO // IN CORSO',
      startNow: 'Inizia Ora ⚡',
      sub15: 'Togli 15s',
      add15: 'Aggiungi 15s',
      closeTimer: 'Chiudi timer',
      coachBadge: 'COACH',
      strengthGain: 'FORZA',
      maxLift: 'Max',
      radarBtn: 'Radar ↗',
      checkinTelemetryTitle: 'TELEMETRIA CORPOREA & BIA',
      checkinHeroTitle: 'Quadri & Avanzamenti',
      checkinHeroDesc: 'Monitoraggio della ricomposizione corporea concordato con Coach Alessandro.',
      bodyWeight: 'Peso Corporeo',
      bodyFatPct: '% Massa Grassa',
      muscleMass: 'Massa Muscolare',
      waistCirc: 'Circonferenza Vita',
      totalProgress: 'Avanzamento Totale:',
      fat: 'Grasso',
      muscle: 'Muscolo',
      athleteGoal: 'Obiettivo Atleta:',
      autoSyncOn: 'SYNC AUTOMATICA ON',
      anabolicVerdictTitle: 'VERDETTO TELEMETRICO // IPERTROFIA CERTIFICATA',
      anabolicVerdictBadge: 'STATO ANABOLICO: ECCELLENTE 🔥',
      massIncreasingTitle: 'La tua massa sta aumentando!',
      massIncreasingDesc: "I dati bioimpedenziometrici registrati certificano una ricomposizione corporea d'élite: stai costruendo nuovo tessuto muscolare contrattile mentre il grasso corporeo scende costantemente.",
      pureMuscle: 'Massa Muscolare Pura',
      contractileTissue: 'tessuto contrattile',
      fatLost: 'Grasso Corporeo Perso',
      fatDropped: 'Adipe ridotto',
      muscleDensity: 'Densità Muscolare',
      ofYourBody: 'del tuo peso corporeo',
      metabolicBoost: 'Spinta Metabolica',
      burnedAtRest: 'al giorno bruciate a riposo',
      coachAnalysisTitle: 'Analisi Telemetrica di Coach Alessandro',
      coachQuote: '"I numeri BIA parlano chiaro: il sovraccarico progressivo sta producendo ipertrofia reale. Il muscolo cresce regolarmente e il grasso viscerale è calato. Continua con questo focus!"',
      radarTitle: 'RADAR RICOMPOSIZIONE CORPOREA',
      radarSubtitle: 'Curva Muscolo (Sale ↗) vs Grasso (Scende ↘)',
      muscleTrend: 'Trend Massa Muscolare:',
      fatTrend: 'Trend Grasso Corporeo:',
      palmaresTitle: 'PALMARES ATLETA',
      achievementsTitle: 'Traguardi & Trofei Sbloccati',
      unlockedRatio: 'SBLOCCATI',
      unlockedBadge: '✨ SBLOCCATO',
      overloadTitle: 'TELEMETRIA SOVRACCARICO PROGRESSIVO',
      strengthGainTitle: 'Guadagno Forza vs Mese Precedente',
      maxStrengthBadge: 'FORZA MASSIMA ↗',
      totalStrengthGainBanner: 'INCREMENTO FORZA TOTALE SUI FONDAMENTALI:',
      gained: 'guadagnati',
      strengthGainDesc: 'Rispetto al mese precedente, la tua capacità di carico neurale e contrattile sui multiarticolari è salita in modo costante.',
      sessionVolume: 'Volume per Sessione',
      keyExercise: 'Esercizio Fondamentale',
      loadProgression: 'Progressione Carichi (Mese Scorso ➔ Oggi)',
      prevMonth: 'Mese Scorso',
      today: 'Oggi',
      directCheckinTitle: 'CHECK-IN DIRETTO ATLETA',
      recordMeasurement: 'Registra Misurazione Odierna',
      quickCheckinTime: 'Rapido • 30 sec',
      weightLabelStep: '1. Peso di Oggi (a digiuno)',
      valueInKg: 'valore in kg',
      waistLabelStep: '2. Circonferenza Addome / Vita',
      waistMeasuredAt: 'misurata a livello ombelico',
      energyLabelStep: '3. Livello Energia & Recupero Odierno',
      fatigued: '1 = Affaticato',
      fullStrength: '5 = Piena Forza',
      sleepQuality: 'Qualità Sonno',
      sleepOptimal: '🌙 Profondo (7-8 ore)',
      sleepFair: '😐 Discreto (~6 ore)',
      sleepPoor: '🥱 Poco / Interrotto (<5h)',
      hydrationYesterday: 'Idratazione Ieri',
      hydrationOptimal: '💧 3 Litri (Ottimale)',
      hydrationNormal: '💧 2 Litri (Normale)',
      hydrationLow: '💧 Meno di 1.5L (Bassa)',
      notesForCoach: '4. Note & Sensazioni per Coach Alessandro',
      notesPlaceholder: 'Es. Recupero muscolare ottimo sulle gambe, fame controllata, pronto per la sessione...',
      sendCheckinBtn: 'INVIA CHECK-IN AL COACH ALESSANDRO',
      checkinSuccessToast: '🚀 Check-in corporeo inviato con successo al Coach Alessandro!',
      historyTitle: 'Cronologia Check-in & BIA',
      readingsCount: 'Rilevamenti',
      clinicalBiaBadge: '🩺 BIA CLINICA PT',
      selfCheckinBadge: '⚖️ CHECK-IN ATLETA',
      fatShort: 'Grasso',
      muscleShort: 'Muscolo',
      waterShort: 'Acqua',
      waistShort: 'Addome',
      strengthGainSummary: 'Forza aumentata di +22.5 kg rispetto al mese precedente! 🔥',
      restFor: 'Recupero',
      resumeWorkout: 'Riprendi ➔',
      pauseWorkout: 'Pausa allenamento'
    },
    restTimer: {
      tag: 'CRONOMETRO // RECUPERO',
      targetEx: 'Esercizio Target',
      atpRecharge: 'Ricarica ATP:',
      readyBtn: 'PRONTO'
    },
    upgrade: {
      badge: 'MODELLO SAAS B2B A SCAGLIONI',
      title: 'Gestione Scaglioni & Abbonamento Coach',
      desc: 'Gli atleti accedono 100% GRATUITAMENTE con il tuo codice invito. Aumenta la capienza slot al crescere del tuo numero di iscritti.',
      statusTitle: 'Stato Occupazione Slot Roster',
      registeredAthletes: 'ATLETI REGISTRATI',
      stripeB2BNotice: 'Fatturazione B2B diretta via Stripe (0% trattenute store)',
      coachFavorite: 'PIÙ SCELTO DAI COACH',
      activeBadge: 'PIANO ATTIVO',
      perMonth: '/ mese',
      capacityLabel: 'CAPIENZA ATLETI:',
      upToAthletes: 'FINO A {X} ATLETI ATTIVI',
      currentPlanBtn: 'PIANO ATTUALE',
      upgradeTierBtn: 'PASSA A QUESTO SCAGLIONE',
      gatekeeperRule: 'Se raggiungi il limite, puoi archiviare atleti inattivi per liberare posti o fare l\'upgrade immediato.',
      closeBtn: 'Chiudi'
    },
    videoModal: {
      tempo: 'CADENZA:',
      officialCoachVideo: 'Video Ufficiale Girato dal Coach',
      demoVideo: 'Video Dimostrativo',
      eccentricConcentric: 'FASE ECCENTRICA (3S) → CONCENTRICA (1S)',
      slowMo: '0.5x Rallentatore',
      normalSpeed: '1.0x Normale',
      gymClipTitle: 'Video girato da voi in palestra: puoi sostituire questo video con la tua clip registrata!',
      cancel: 'Annulla',
      customUploadBtn: '+ Incolla Link o Carica Video Tuo',
      customUploadLabel: 'Link Video del Coach (YouTube, Vimeo, MP4, Google Drive, ecc.)',
      customUploadPlaceholder: 'https://... link alla tua video guida',
      save: 'Salva',
      customUploadTip: '💡 Puoi incollare qualsiasi link video MP4 o caricare un file video da smartphone per mostrare la tua esecuzione personale agli atleti.',
      cuesTitle: 'Punti Chiave Biomeccanici (Coaching Cues)',
      mistakesTitle: 'Errori Comuni da Evitare',
      coachNoteTitle: 'Nota Specifica del Coach Alessandro:',
      sendExecutionToCoach: 'Invia la tua esecuzione al Coach',
      understoodReturn: 'Ho Capito, Torna alla Scheda'
    },
    routineModal: {
      focusWomen: '🌸 Focus Donna',
      focusMen: '⚡ Focus Uomo',
      unisexRecomp: '🌐 Unisex / Recomp',
      perWeek: 'X / SETTIMANA',
      minEstimated: 'MIN',
      totalExercises: 'ESERCIZI TOTALI',
      goalProtocol: 'Obiettivo Protocollo:',
      tabAssign: 'Assegnazione Atleti',
      tabExercises: 'Dettagli Esercizi & Carichi',
      assignTitle: 'A chi vuoi assegnare questa scheda?',
      assignSubtitle: 'Spunta gli atleti dal roster. Cliccando conferma, la scheda diventerà subito attiva per ciascuno di loro.',
      searchPlaceholder: 'Cerca atleta per nome o obiettivo...',
      currentlyActive: '✅ Attualmente Attiva',
      goalLabel: 'Obiettivo:',
      todayRoutine: 'Scheda Odierna',
      noRoutine: 'Nessuna',
      splitStructure: 'STRUTTURA SPLIT',
      daySingular: 'GIORNATA',
      dayPlural: 'GIORNATE',
      frequency: 'Frequenza:',
      restSeconds: 'RECUPERO',
      setsCol: 'Serie',
      targetLoadCol: 'Carico Target',
      repsCol: 'Ripetizioni',
      setTypeCol: 'Tipo Serie',
      setWord: 'SERIE',
      prBadge: '🏆 RECORD',
      standardBadge: 'STANDARD',
      deleteBtn: 'Elimina',
      editBuilderBtn: 'Modifica nel Builder',
      selectedCount: 'atleti selezionati',
      confirmAssignBtn: 'Conferma Assegnazione',
      selectAtLeastOneError: '⚠️ Seleziona almeno un atleta a cui assegnare la scheda.',
      deleteConfirm: 'Sei sicuro di voler eliminare la scheda dalla libreria?'
    },
    toasts: {
      setDone: 'Serie completata!',
      prRecord: '🏆 NUOVO RECORD PERSONALE! {weight} kg su {exercise}!',
      timerDone: '⏰ Recupero terminato per {exercise}! Pronto per la prossima serie.',
      planUpgraded: '🎉 Abbonamento aggiornato a {plan}! Capienza sbloccata fino a {slots} atleti.',
      athleteAdded: '✅ Atleta {name} aggiunto! Slot liberi: {free}.',
      athleteArchived: '📦 Atleta archiviato. Lo slot è stato liberato!',
      athleteRestored: '✅ Atleta ripristinato con successo.',
      routineSaved: '🎉 Scheda "{title}" salvata e inviata all\'atleta!',
      workoutFinished: '🚀 Allenamento sincronizzato! Il tuo Coach ha ricevuto la notifica nel Live Feed.',
      reviewedMarked: 'Segnalazione verificata e archiviata.',
      slotLimitError: '⚠️ Limite di {slots} atleti raggiunto. Esegui l\'upgrade per aggiungerne altri.'
    }
  },
  en: {
    nav: {
      systemTag: 'PRO SUITE',
      subTitle: 'Personal Trainer Platform & Athlete App',
      coachCockpit: 'Coach Cockpit',
      athleteHUD: 'Athlete HUD',
      tier: 'TIER',
      slots: 'SLOTS',
      desktopView: 'Desktop Console',
      tabletView: 'Tablet Console (iPad)',
      mobileView: 'Smartphone Viewport',
      settings: 'Settings',
      coachRole: 'COACH',
      athleteRole: 'ATHLETE'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Language, acoustic cues and multi-device connection',
      closeTitle: 'Close settings',
      closeBtn: 'Close Settings',
      appLanguage: 'Application Language',
      current: 'Current',
      langDescription: 'Configure system language. Preferences are saved persistently across all your connected devices.',
      activeBadge: '✓ ACTIVE',
      langUpdated: 'Language updated',
      soundTitle: 'Acoustic Feedback & Sound Cues',
      soundDescription: 'Acoustic cues for set completion, rest timer countdown (Technogym Live) and new Personal Record celebrations.',
      soundEnable: 'Enable sound',
      soundDisable: 'Disable sound',
      soundTestTitle: 'Test Set Completion Cue',
      soundPlayBtn: 'Play 🔔',
      soundPlayedToast: '🔔 Test sound played',
      devicesTitle: 'Physical Device Synchronization',
      wifiLocal: 'Local Wi-Fi Network',
      sseActive: 'SSE STREAM ACTIVE',
      devicePhone: '• Galaxy A20e Smartphone (Athlete Console)',
      deviceTablet: '• Galaxy Tab A 10.1" Tablet (Coach Cockpit)',
      openQrBtn: 'Open Quick Connect QR Code',
      suiteTitle: 'Personal Coach Pro Suite',
      reactiveArch: 'v2.4.0 • Reactive Architecture',
      languages: {
        itDesc: 'Default platform language. Protocols, telemetry, video guides and notifications in Italian.',
        itTag: 'Italian',
        enDesc: 'Full English platform translation, international workout terminology and cues.',
        enTag: 'Recommended',
        esDesc: 'Full Spanish translation, training protocols and biometrics telemetry.',
        esTag: 'Spanish'
      }
    },
    connectDevices: {
      title: 'Multi-Device Android Connection',
      subtitle: 'Scan the QR codes with your camera to open the app on physical devices connected to Wi-Fi.',
      syncActive: 'LIVE SYNC ACTIVE',
      networkOk: 'LOCAL NETWORK OK',
      closeTitle: 'Close',
      closeBtn: 'Got it, Close',
      localWifi: 'Local Wi-Fi Network',
      wifiTip: 'Ensure both Smartphone and Tablet are connected to the exact same Wi-Fi network as the computer.',
      port: 'Port',
      phoneTitle: '1. Android Smartphone',
      phoneConsole: 'CLIENT / ATHLETE CONSOLE',
      athleteOnly: 'Athlete Only',
      phoneDesc: 'Optimized for 1-hand gym floor use: active protocol, set log, rest countdown and self check-in.',
      scanWithCamera: 'Scan with Android Camera',
      linkCopied: 'Link Copied!',
      copyPhoneLink: 'Copy Smartphone Link',
      tabletTitle: '2. Android Tablet',
      tabletConsole: 'COACH & ATHLETE (BOTH)',
      fullCockpit: 'Full Cockpit',
      tabletDesc: 'Widescreen dashboard: Live Feed, Athlete CRM, Workout Builder, Comms and 1-tap quick role switch at top.',
      copyTabletLink: 'Copy Tablet Link',
      syncMagicTitle: 'Live Real-Time Sync Magic:',
      syncMagicDesc: 'When the athlete taps the green checkmark on their Smartphone or submits a check-in, the Tablet immediately receives the live event and updates progress without reloading!',
      linkCopiedToast: '📋 Link copied!'
    },
    trainer: {
      stats: {
        rosterCapacity: 'ROSTER CAPACITY',
        fleetCompliance: 'FLEET COMPLIANCE',
        todayMissions: 'TODAY MISSIONS',
        checksPending: 'PENDING CHECKS',
        activeTier: 'ACTIVE TIER',
        vsPrev: '+4.1% VS PREV 30D CYCLE',
        doneMissions: 'DONE',
        activeInGym: '2 ATHLETES IN GYM',
        alertsCount: 'ALERTS',
        postureCheck: '1 VIDEO POSTURE CHECK',
        videoAbbr: 'video'
      },
      tabs: {
        liveFeed: 'LIVE ACTIVITY TELEMETRY',
        rosterCRM: 'ROSTER CRM & SLOTS',
        builder: 'PROTOCOL BUILDER',
        chat: 'VIDEO CHECK & COMMS',
        athletesShort: 'Athletes',
        routinesShort: 'Protocols'
      },
      feed: {
        title: 'REAL-TIME TELEMETRY STREAM',
        subTitle: 'Instant feed: recorded weights, broken PRs and form checks',
        socketConnected: 'SOCKET CONNECTED',
        checkVideo: 'CHECK VIDEO',
        alertCoach: 'ALERT COACH',
        verifyMark: 'Mark as verified'
      },
      crm: {
        gaugeTitle: 'TIER CAPACITY GAUGE:',
        allSlotsEngaged: 'ALL SLOTS ENGAGED',
        activeRoster: 'ACTIVE ATHLETES REGISTERED',
        upgradeTier: 'UPGRADE TIER',
        enrollAthlete: '+ ENROLL ATHLETE',
        slotsFull: 'SLOTS FULL (UPGRADE)',
        availableSlots: 'AVAILABLE ROSTER SLOTS',
        capacityEngaged: 'CAPACITY ENGAGED',
        searchPlaceholder: 'Search athlete by name or email...',
        filterAll: 'ACTIVE',
        filterInactive: 'INACTIVE (>4D)',
        filterArchived: 'ARCHIVED',
        compliance: 'COMPLIANCE:',
        today: 'TODAY',
        daysAgo: 'D AGO',
        restore: 'RESTORE',
        archive: 'Archive athlete to free up a slot',
        modalTitle: 'Enroll New Athlete',
        modalSubtitle: 'The client will access the app for free linked to your coach code.',
        nameLabel: 'Full Name',
        emailLabel: 'Email Address',
        weightLabel: 'Bodyweight (kg)',
        goalLabel: 'Primary Goal',
        cancel: 'Cancel',
        submitEnroll: 'Enroll & Allocate Slot',
        dossierBtn: 'Dossier',
        openDossierTitle: 'Open Athlete Dossier & Rest Settings',
        rosterEnrollment: 'ROSTER ENROLLMENT'
      },
      builder: {
        generatorTag: 'PROTOCOL GENERATOR V2.0',
        title: 'RAPID PROTOCOL BUILDER',
        saveAssign: 'SAVE & ASSIGN PROTOCOL',
        routineTitleLabel: 'WORKOUT PROTOCOL TITLE',
        exerciseDb: 'EXERCISE DATABASE',
        setCol: 'SET',
        loadCol: 'TARGET LOAD',
        repsCol: 'TARGET REPS',
        statusCol: 'STATUS',
        configuredStatus: 'ACTIVE',
        addSet: '+ ADD SET',
        restLabel: 'REST:',
        hubTitle: 'WORKOUT PROTOCOLS & TEMPLATES HUB',
        hubSubtitle: '1-to-1 Protocol Management & Assignment',
        hubDesc: 'Inspect all designed protocols, create custom programs and assign them directly to roster athletes.',
        routinesCount: 'Protocols',
        newRoutineBtn: '+ New Protocol',
        searchPlaceholder: 'Search by title or target muscle...',
        filterAll: 'All',
        filterWomen: '🌸 Women',
        filterMen: '⚡ Men',
        filterRecomp: '🌐 Recomp',
        editBtn: 'Edit',
        openAssignBtn: 'Open & Assign',
        noRoutinesFound: 'No protocols found',
        createNowBtn: '+ Create new protocol now',
        returnToGallery: '← Back to Protocol Library',
        saveBtn: 'Save',
        saveAndAssignBtn: 'Save & Assign',
        categoryLabel: 'Protocol Category',
        weeklyFreqLabel: 'Weekly Frequency',
        targetAnatomyLabel: 'Anatomical Target',
        targetGoalLabel: 'Target Goal',
        difficultyLabel: 'Difficulty Level',
        durationLabel: 'Estimated Minutes',
        assignedStatus: 'Assignment Status:',
        notAssignedYet: '⚪ Unassigned yet',
        daysDetail: 'Days Breakdown',
        includedExercises: 'Included Exercises'
      },
      chat: {
        activeRoster: 'ACTIVE ROSTER',
        telemetrySynced: 'TELEMETRY SYNCED 10M AGO',
        encryptedChannel: 'ENCRYPTED DIRECT CHANNEL',
        inputPlaceholder: 'Send technical instructions, posture corrections or feedback...',
        secureShort: 'Secure'
      },
      addAthleteShort: '+ Athlete',
      addRoutineShort: '+ Routine',
      activeAthletes: 'Active Athletes'
    },
    athlete: {
      telemetryTitle: 'ATHLETE TELEMETRY',
      coachLabel: 'COACH:',
      streakLabel: 'ACTIVE STREAK',
      todayProtocol: "TODAY'S PROTOCOL",
      estDuration: 'EST.',
      initWorkout: 'INITIALIZE WORKOUT NOW',
      postureCardTitle: 'Form & Lift Verification',
      postureCardDesc: 'Send an execution clip to check technique with your coach',
      recVideoBtn: 'REC VIDEO',
      sessionRecording: 'ACTIVE SET RECORDING',
      doneRatio: 'COMPLETED',
      recoveryLabel: 'RECOVERY:',
      rpeLabel: 'TARGET RPE',
      coachCue: 'COACH CUE:',
      setLabel: 'SET',
      prTarget: 'PR TARGET',
      concludeSync: 'CONCLUDE & SYNC PROTOCOL',
      telemetryOnline: 'COACH ONLINE',
      sendVideo: 'SEND VIDEO',
      chatPlaceholder: 'Message Coach Alessandro...',
      missionAccomplished: 'MISSION ACCOMPLISHED',
      protocolCompleted: 'PROTOCOL COMPLETED!',
      syncSuccessDesc: 'Telemetry synced! Coach Alessandro received your workout report in the Live Feed.',
      totalVolume: 'TOTAL VOLUME',
      newRecord: 'NEW RECORD',
      returnToHub: 'RETURN TO HUB',
      levelLabel: 'LEVEL',
      streakBadge: '3W Streak',
      expLabel: 'EXPERIENCE',
      pointsLabel: 'PTS',
      repsAbbr: 'REPS',
      videoGuide: 'Video Guide',
      recordBadge: 'RECORD',
      routineTab: 'Routine',
      checkinTab: 'Check-in',
      coachTab: 'Coach',
      anabolicState: 'ANABOLIC STATE: +{val}KG LEAN MASS 🔥',
      leanMass: 'LEAN MASS',
      progressiveOverloadOn: 'Progressive overload on',
      sessionText: 'Session:',
      activeProtocolDescription: 'Active protocol with progressive overload and coach-calibrated RPE recovery.',
      splitSelection: 'SPLIT SELECTION',
      swipe: 'SWIPE ➔',
      weeklyFreq: 'x/wk',
      exercises: 'exercises',
      scheduledExercises: 'Scheduled exercises',
      sets: 'sets',
      timerUrgent: '⚠️ GET READY!',
      timerRest: 'REST // IN PROGRESS',
      startNow: 'Start Now ⚡',
      sub15: '-15s',
      add15: '+15s',
      closeTimer: 'Close timer',
      coachBadge: 'COACH',
      strengthGain: 'STRENGTH',
      maxLift: 'Max',
      radarBtn: 'Radar ↗',
      checkinTelemetryTitle: 'BODY TELEMETRY & BIA',
      checkinHeroTitle: 'Metrics & Progression',
      checkinHeroDesc: 'Body recomposition monitoring calibrated with Coach Alessandro.',
      bodyWeight: 'Bodyweight',
      bodyFatPct: 'Body Fat %',
      muscleMass: 'Muscle Mass',
      waistCirc: 'Waist Circumference',
      totalProgress: 'Total Progress:',
      fat: 'Fat',
      muscle: 'Muscle',
      athleteGoal: 'Athlete Goal:',
      autoSyncOn: 'AUTO SYNC ON',
      anabolicVerdictTitle: 'TELEMETRY VERDICT // CERTIFIED HYPERTROPHY',
      anabolicVerdictBadge: 'ANABOLIC STATUS: EXCELLENT 🔥',
      massIncreasingTitle: 'Your lean mass is increasing!',
      massIncreasingDesc: 'Recorded bioimpedance data certifies elite body recomposition: building new contractile muscle while body fat drops steadily.',
      pureMuscle: 'Pure Muscle Mass',
      contractileTissue: 'contractile tissue',
      fatLost: 'Body Fat Lost',
      fatDropped: 'Adipose reduced',
      muscleDensity: 'Muscle Density',
      ofYourBody: 'of bodyweight',
      metabolicBoost: 'Metabolic Boost',
      burnedAtRest: 'burned daily at rest',
      coachAnalysisTitle: 'Telemetry Analysis by Coach Alessandro',
      coachQuote: '"The BIA numbers are indisputable: progressive overload is driving genuine hypertrophy. Contractile muscle is growing while visceral fat dropped. Keep up this intensity!"',
      radarTitle: 'BODY RECOMPOSITION RADAR',
      radarSubtitle: 'Muscle Curve (Rising ↗) vs Fat Curve (Dropping ↘)',
      muscleTrend: 'Muscle Mass Trend:',
      fatTrend: 'Body Fat Trend:',
      palmaresTitle: 'ATHLETE PALMARES',
      achievementsTitle: 'Unlocked Trophies & Milestones',
      unlockedRatio: 'UNLOCKED',
      unlockedBadge: '✨ UNLOCKED',
      overloadTitle: 'PROGRESSIVE OVERLOAD TELEMETRY',
      strengthGainTitle: 'Strength Gain vs Previous Month',
      maxStrengthBadge: 'MAX STRENGTH ↗',
      totalStrengthGainBanner: 'TOTAL STRENGTH INCREASE ON KEY LIFTS:',
      gained: 'gained',
      strengthGainDesc: 'Compared to the previous cycle, your neural and contractile strength capacity on compounds increased consistently.',
      sessionVolume: 'Volume per Session',
      keyExercise: 'Core Compound Lift',
      loadProgression: 'Load Progression (Last Month ➔ Today)',
      prevMonth: 'Last Month',
      today: 'Today',
      directCheckinTitle: 'DIRECT ATHLETE CHECK-IN',
      recordMeasurement: "Log Today's Measurement",
      quickCheckinTime: 'Quick • 30 sec',
      weightLabelStep: "1. Today's Weight (fasted)",
      valueInKg: 'value in kg',
      waistLabelStep: '2. Abdomen / Waist Circumference',
      waistMeasuredAt: 'measured at navel level',
      energyLabelStep: '3. Energy & Recovery Level Today',
      fatigued: '1 = Fatigued',
      fullStrength: '5 = Full Strength',
      sleepQuality: 'Sleep Quality',
      sleepOptimal: '🌙 Deep (7-8 hours)',
      sleepFair: '😐 Moderate (~6 hours)',
      sleepPoor: '🥱 Poor / Interrupted (<5h)',
      hydrationYesterday: 'Hydration Yesterday',
      hydrationOptimal: '💧 3 Liters (Optimal)',
      hydrationNormal: '💧 2 Liters (Normal)',
      hydrationLow: '💧 Under 1.5L (Low)',
      notesForCoach: '4. Notes & Feedback for Coach Alessandro',
      notesPlaceholder: 'E.g. Great leg recovery, appetite well controlled, ready for heavy sets...',
      sendCheckinBtn: 'SUBMIT CHECK-IN TO COACH ALESSANDRO',
      checkinSuccessToast: '🚀 Body check-in successfully submitted to Coach Alessandro!',
      historyTitle: 'Check-in & BIA History',
      readingsCount: 'Records',
      clinicalBiaBadge: '🩺 CLINICAL PT BIA',
      selfCheckinBadge: '⚖️ ATHLETE CHECK-IN',
      fatShort: 'Fat',
      muscleShort: 'Muscle',
      waterShort: 'Water',
      waistShort: 'Waist',
      strengthGainSummary: 'Strength increased by +22.5 kg compared to last month! 🔥',
      restFor: 'Rest for',
      resumeWorkout: 'Resume ➔',
      pauseWorkout: 'Pause workout'
    },
    restTimer: {
      tag: 'CHRONO // RECOVERY',
      targetEx: 'Target Exercise',
      atpRecharge: 'ATP Recharge:',
      readyBtn: 'READY'
    },
    upgrade: {
      badge: 'B2B SAAS TIER SYSTEM',
      title: 'Tier Management & Coach Subscription',
      desc: 'Athletes join 100% FOR FREE using your coach invite code. Unlock more slots as your business expands.',
      statusTitle: 'Roster Slot Occupancy',
      registeredAthletes: 'REGISTERED ATHLETES',
      stripeB2BNotice: 'Direct B2B Billing via Stripe (0% app store cut)',
      coachFavorite: 'COACH FAVORITE',
      activeBadge: 'ACTIVE PLAN',
      perMonth: '/ month',
      capacityLabel: 'ATHLETE CAPACITY:',
      upToAthletes: 'UP TO {X} ACTIVE ATHLETES',
      currentPlanBtn: 'CURRENT PLAN',
      upgradeTierBtn: 'UPGRADE TO THIS TIER',
      gatekeeperRule: 'When full, archive inactive clients to free slots or upgrade instantly with prorated billing.',
      closeBtn: 'Close'
    },
    videoModal: {
      tempo: 'TEMPO:',
      officialCoachVideo: 'Official Coach Video Guide',
      demoVideo: 'Demo Video',
      eccentricConcentric: 'ECCENTRIC PHASE (3S) → CONCENTRIC (1S)',
      slowMo: '0.5x Slow-Motion',
      normalSpeed: '1.0x Normal',
      gymClipTitle: 'Coach Gym Clip: You can replace this demonstration with your own video!',
      cancel: 'Cancel',
      customUploadBtn: '+ Paste Link or Upload Your Video',
      customUploadLabel: 'Coach Video Link (YouTube, Vimeo, MP4, Google Drive, etc.)',
      customUploadPlaceholder: 'https://... link to your video guide',
      save: 'Save',
      customUploadTip: '💡 You can paste any MP4 video URL or upload a video from your smartphone to demonstrate personal technique to athletes.',
      cuesTitle: 'Biomechanical Key Points (Coaching Cues)',
      mistakesTitle: 'Common Mistakes to Avoid',
      coachNoteTitle: 'Specific Note from Coach Alessandro:',
      sendExecutionToCoach: 'Send your execution clip to Coach',
      understoodReturn: 'Got it, Return to Protocol'
    },
    routineModal: {
      focusWomen: '🌸 Women Focus',
      focusMen: '⚡ Men Focus',
      unisexRecomp: '🌐 Unisex / Recomp',
      perWeek: 'X / WEEK',
      minEstimated: 'MIN',
      totalExercises: 'TOTAL EXERCISES',
      goalProtocol: 'Protocol Goal:',
      tabAssign: 'Athlete Allocation',
      tabExercises: 'Exercise Breakdown & Loads',
      assignTitle: 'Which athletes should follow this protocol?',
      assignSubtitle: 'Select athletes from your roster. Confirming immediately activates this workout for them.',
      searchPlaceholder: 'Search athlete by name or goal...',
      currentlyActive: '✅ Currently Active',
      goalLabel: 'Goal:',
      todayRoutine: 'Current Protocol',
      noRoutine: 'None',
      splitStructure: 'SPLIT STRUCTURE',
      daySingular: 'DAY',
      dayPlural: 'DAYS',
      frequency: 'Frequency:',
      restSeconds: 'REST',
      setsCol: 'Set',
      targetLoadCol: 'Target Load',
      repsCol: 'Reps',
      setTypeCol: 'Set Type',
      setWord: 'SET',
      prBadge: '🏆 RECORD',
      standardBadge: 'STANDARD',
      deleteBtn: 'Delete',
      editBuilderBtn: 'Edit in Builder',
      selectedCount: 'athletes selected',
      confirmAssignBtn: 'Confirm Assignment',
      selectAtLeastOneError: '⚠️ Select at least one athlete to assign.',
      deleteConfirm: 'Are you sure you want to delete this protocol from the library?'
    },
    toasts: {
      setDone: 'Set recorded!',
      prRecord: '🏆 NEW PERSONAL RECORD! {weight} kg on {exercise}!',
      timerDone: '⏰ Rest finished for {exercise}! Ready for next set.',
      planUpgraded: '🎉 Subscription upgraded to {plan}! Capacity expanded to {slots} athletes.',
      athleteAdded: '✅ Athlete {name} added! Available slots: {free}.',
      athleteArchived: '📦 Athlete archived. Slot released!',
      athleteRestored: '✅ Athlete restored successfully.',
      routineSaved: '🎉 Protocol "{title}" saved and dispatched to athlete!',
      workoutFinished: '🚀 Protocol synced! Coach received notification in Live Feed.',
      reviewedMarked: 'Alert reviewed and resolved.',
      slotLimitError: '⚠️ {slots} athlete limit reached. Upgrade to enroll more.'
    }
  },
  es: {
    nav: {
      systemTag: 'PRO SUITE',
      subTitle: 'Plataforma para Entrenadores y App de Clientes',
      coachCockpit: 'Cockpit Coach',
      athleteHUD: 'Consola Atleta',
      tier: 'PLAN',
      slots: 'PLAZAS',
      desktopView: 'Consola Desktop',
      tabletView: 'Consola Tablet (iPad)',
      mobileView: 'Smartphone Viewport',
      settings: 'Ajustes',
      coachRole: 'COACH',
      athleteRole: 'ATLETA'
    },
    settings: {
      title: 'Ajustes',
      subtitle: 'Idioma, señales acústicas y sincronización de dispositivos',
      closeTitle: 'Cerrar ajustes',
      closeBtn: 'Cerrar Ajustes',
      appLanguage: 'Idioma de la Aplicación',
      current: 'Actual',
      langDescription: 'Configura el idioma del sistema. Las preferencias se guardan de forma permanente y se sincronizan entre dispositivos.',
      activeBadge: '✓ ACTIVO',
      langUpdated: 'Idioma actualizado',
      soundTitle: 'Feedback Sonoro y Señales Acústicas',
      soundDescription: 'Señales acústicas para confirmación de series, cuenta atrás del descanso (Technogym Live) y celebración de nuevos récords personales.',
      soundEnable: 'Activar sonidos',
      soundDisable: 'Desactivar sonidos',
      soundTestTitle: 'Probar Sonido de Serie',
      soundPlayBtn: 'Reproducir 🔔',
      soundPlayedToast: '🔔 Sonido de prueba reproducido',
      devicesTitle: 'Sincronización de Dispositivos Físicos',
      wifiLocal: 'Red Wi-Fi Local',
      sseActive: 'STREAM SSE ACTIVO',
      devicePhone: '• Smartphone Galaxy A20e (Consola Atleta)',
      deviceTablet: '• Tablet Galaxy Tab A 10.1" (Cockpit Coach)',
      openQrBtn: 'Abrir Código QR de Conexión',
      suiteTitle: 'Personal Coach Pro Suite',
      reactiveArch: 'v2.4.0 • Arquitectura Reactiva',
      languages: {
        itDesc: 'Idioma predeterminado. Protocolos, telemetría y guías en italiano.',
        itTag: 'Italiano',
        enDesc: 'Traducción completa en inglés, terminología y ejecuciones internacionales.',
        enTag: 'Internacional',
        esDesc: 'Traducción completa en español, protocolos y telemetría de entrenamiento.',
        esTag: 'Recomendado'
      }
    },
    connectDevices: {
      title: 'Conexión Multi-Dispositivo Android',
      subtitle: 'Escanea los códigos QR con la cámara para abrir la app en tus dispositivos físicos conectados al Wi-Fi.',
      syncActive: 'LIVE SYNC ACTIVO',
      networkOk: 'RED LOCAL OK',
      closeTitle: 'Cerrar',
      closeBtn: 'Entendido, Cerrar',
      localWifi: 'Red Wi-Fi Local',
      wifiTip: 'Asegúrate de que el Smartphone y la Tablet estén conectados a la misma red Wi-Fi que el ordenador.',
      port: 'Puerto',
      phoneTitle: '1. Smartphone Android',
      phoneConsole: 'CONSOLA USUARIO / ATLETA',
      athleteOnly: 'Solo Atleta',
      phoneDesc: 'Optimizada para uso a una mano en el gimnasio: rutina activa, registro de series, descanso y check-in.',
      scanWithCamera: 'Escanear con Cámara Android',
      linkCopied: '¡Enlace Copiado!',
      copyPhoneLink: 'Copiar Enlace Smartphone',
      tabletTitle: '2. Tablet Android',
      tabletConsole: 'COACH Y ATLETA (AMBOS)',
      fullCockpit: 'Cockpit Completo',
      tabletDesc: 'Pantalla panorámica: Feed en vivo, CRM Atletas, Creador de Rutinas, Chat y cambio rápido de rol en cabecera.',
      copyTabletLink: 'Copiar Enlace Tablet',
      syncMagicTitle: 'Sincronización en Tiempo Real:',
      syncMagicDesc: '¡Cuando el atleta marca la casilla verde en su Smartphone o envía un check-in, la Tablet recibe el evento al instante y actualiza los progresos sin recargar!',
      linkCopiedToast: '📋 ¡Enlace copiado!'
    },
    trainer: {
      stats: {
        rosterCapacity: 'CAPACIDAD ATLETAS',
        fleetCompliance: 'CUMPLIMIENTO ATLETAS',
        todayMissions: 'ENTRENAMIENTOS HOY',
        checksPending: 'CHECKS PENDIENTES',
        activeTier: 'PLAN ACTIVO',
        vsPrev: '+4.1% RESPECTO AL MES ANTERIOR',
        doneMissions: 'COMPLETADOS',
        activeInGym: '2 ATLETAS EN EL GIMNASIO',
        alertsCount: 'ALERTAS',
        postureCheck: '1 VIDEO REVISIÓN TÉCNICA',
        videoAbbr: 'vídeo'
      },
      tabs: {
        liveFeed: 'TELEMETRÍA EN VIVO',
        rosterCRM: 'GESTIÓN ATLETAS & PLAZAS',
        builder: 'CREAR PROTOCOLO',
        chat: 'VIDEO CHECK & CHAT',
        athletesShort: 'Atletas',
        routinesShort: 'Rutinas'
      },
      feed: {
        title: 'FLUJO TELEMÉTRICO EN TIEMPO REAL',
        subTitle: 'Notificaciones en directo: pesos registrados, récords y vídeos a revisar',
        socketConnected: 'STREAM CONECTADO',
        checkVideo: 'VER VÍDEO',
        alertCoach: 'ENVIAR ALERTA',
        verifyMark: 'Marcar como revisado'
      },
      crm: {
        gaugeTitle: 'CAPACIDAD DEL PLAN:',
        allSlotsEngaged: 'TODAS LAS PLAZAS OCUPADAS',
        activeRoster: 'ATLETAS ACTIVOS REGISTRADOS',
        upgradeTier: 'MEJORAR PLAN',
        enrollAthlete: '+ AÑADIR ATLETA',
        slotsFull: 'PLAZAS LLENAS (MEJORAR)',
        availableSlots: 'PLAZAS DISPONIBLES',
        capacityEngaged: 'CAPACIDAD USADA',
        searchPlaceholder: 'Buscar atleta por nombre o email...',
        filterAll: 'ACTIVOS',
        filterInactive: 'INACTIVOS (>4D)',
        filterArchived: 'ARCHIVADOS',
        compliance: 'CUMPLIMIENTO:',
        today: 'HOY',
        daysAgo: 'DÍAS',
        restore: 'RESTAURAR',
        archive: 'Archivar atleta para liberar plaza',
        modalTitle: 'Inscribir Nuevo Atleta',
        modalSubtitle: 'El cliente accederá gratis con tu código de entrenador.',
        nameLabel: 'Nombre y Apellidos',
        emailLabel: 'Correo Electrónico',
        weightLabel: 'Peso Corporal (kg)',
        goalLabel: 'Objetivo Principal',
        cancel: 'Cancelar',
        submitEnroll: 'Guardar y Asignar Plaza',
        dossierBtn: 'Ficha',
        openDossierTitle: 'Abrir Ficha de Atleta y Ajustes de Descanso',
        rosterEnrollment: 'INSCRIPCIÓN ATLETA'
      },
      builder: {
        generatorTag: 'GENERADOR PROTOCOLOS V2.0',
        title: 'CONSTRUCTOR RÁPIDO DE RUTINAS',
        saveAssign: 'GUARDAR Y ASIGNAR',
        routineTitleLabel: 'TÍTULO DE LA RUTINA',
        exerciseDb: 'BASE DE EJERCICIOS',
        setCol: 'SERIE',
        loadCol: 'PESO OBJETIVO',
        repsCol: 'REPS OBJETIVO',
        statusCol: 'ESTADO',
        configuredStatus: 'ACTIVA',
        addSet: '+ AÑADIR SERIE',
        restLabel: 'DESCANSO:',
        hubTitle: 'HUB DE PROTOCOLOS Y MODELOS DE ENTRENAMIENTO',
        hubSubtitle: 'Gestión y Asignación Personalizada 1-a-1',
        hubDesc: 'Consulta todas las rutinas creadas, diseña nuevos programas y asígnalos directamente a los atletas.',
        routinesCount: 'Rutinas',
        newRoutineBtn: '+ Nueva Rutina',
        searchPlaceholder: 'Buscar por nombre o músculo...',
        filterAll: 'Todas',
        filterWomen: '🌸 Mujer',
        filterMen: '⚡ Hombre',
        filterRecomp: '🌐 Recomp',
        editBtn: 'Modificar',
        openAssignBtn: 'Abrir y Asignar',
        noRoutinesFound: 'No se encontraron rutinas',
        createNowBtn: '+ Crear una nueva rutina ahora',
        returnToGallery: '← Volver a la Biblioteca de Rutinas',
        saveBtn: 'Guardar',
        saveAndAssignBtn: 'Guardar y Asignar',
        categoryLabel: 'Categoría de Rutina',
        weeklyFreqLabel: 'Frecuencia Semanal',
        targetAnatomyLabel: 'Objetivo Anatómico',
        targetGoalLabel: 'Objetivo Principal',
        difficultyLabel: 'Nivel de Dificultad',
        durationLabel: 'Minutos Estimados',
        assignedStatus: 'Estado de Asignación:',
        notAssignedYet: '⚪ Sin asignar aún',
        daysDetail: 'Detalle de Sesiones',
        includedExercises: 'Ejercicios Incluidos'
      },
      chat: {
        activeRoster: 'ATLETA ACTIVO',
        telemetrySynced: 'SINCRONIZADO HACE 10M',
        encryptedChannel: 'CANAL DIRECTO ENCRIPTADO',
        inputPlaceholder: 'Enviar correcciones de técnica, feedback o indicaciones...',
        secureShort: 'Segura'
      },
      addAthleteShort: '+ Atleta',
      addRoutineShort: '+ Rutina',
      activeAthletes: 'Atletas Activos'
    },
    athlete: {
      telemetryTitle: 'TELEMETRÍA ATLETA',
      coachLabel: 'ENTRENADOR:',
      streakLabel: 'RACHA ACTIVA',
      todayProtocol: 'PROTOCOLO DE HOY',
      estDuration: 'EST.',
      initWorkout: 'INICIAR ENTRENAMIENTO YA',
      postureCardTitle: 'Revisión Técnica y Postura',
      postureCardDesc: 'Envía un clip de tu serie para que el coach revise tu técnica',
      recVideoBtn: 'GRABAR VÍDEO',
      sessionRecording: 'REGISTRO DE SERIE ACTIVA',
      doneRatio: 'COMPLETADO',
      recoveryLabel: 'DESCANSO:',
      rpeLabel: 'RPE OBJETIVO',
      coachCue: 'CONSEJO DEL COACH:',
      setLabel: 'SERIE',
      prTarget: 'RÉCORD PERSONAL',
      concludeSync: 'FINALIZAR Y SINCRONIZAR',
      telemetryOnline: 'COACH EN LÍNEA',
      sendVideo: 'ENVIAR VÍDEO',
      chatPlaceholder: 'Escribir al Coach Alessandro...',
      missionAccomplished: 'MISIÓN CUMPLIDA',
      protocolCompleted: '¡ENTRENAMIENTO COMPLETADO!',
      syncSuccessDesc: 'Datos sincronizados. Tu Coach Alessandro ha recibido el informe en el Live Feed.',
      totalVolume: 'VOLUMEN TOTAL',
      newRecord: 'NUEVO RÉCORD',
      returnToHub: 'VOLVER AL HUB',
      levelLabel: 'NIVEL',
      streakBadge: '3 Sem. Constancia',
      expLabel: 'EXPERIENCIA',
      pointsLabel: 'PUNTOS',
      repsAbbr: 'REPS',
      videoGuide: 'Guía Vídeo',
      recordBadge: 'RÉCORD',
      routineTab: 'Rutina',
      checkinTab: 'Check-in',
      coachTab: 'Entrenador',
      anabolicState: 'ESTADO ANABÓLICO: +{val}KG MASA MAGRA 🔥',
      leanMass: 'MASA MAGRA',
      progressiveOverloadOn: 'Sobrecarga progresiva en',
      sessionText: 'Sesión:',
      activeProtocolDescription: 'Protocolo activo con sobrecarga progresiva y recuperación RPE calibrada por el entrenador.',
      splitSelection: 'SELECCIÓN DE SPLIT',
      swipe: 'DESLIZA ➔',
      weeklyFreq: 'x/sem.',
      exercises: 'ejercicios',
      scheduledExercises: 'Ejercicios programados',
      sets: 'series',
      timerUrgent: '⚠️ ¡PREPÁRATE!',
      timerRest: 'RECUPERACIÓN // EN CURSO',
      startNow: 'Empezar Ahora ⚡',
      sub15: '-15s',
      add15: '+15s',
      closeTimer: 'Cerrar temporizador',
      coachBadge: 'COACH',
      strengthGain: 'FUERZA',
      maxLift: 'Máx',
      radarBtn: 'Radar ↗',
      checkinTelemetryTitle: 'TELEMETRÍA CORPORAL Y BIA',
      checkinHeroTitle: 'Evolución y Mediciones',
      checkinHeroDesc: 'Monitoreo de recomposición corporal con el Coach Alessandro.',
      bodyWeight: 'Peso Corporal',
      bodyFatPct: '% Grasa Corporal',
      muscleMass: 'Masa Muscular',
      waistCirc: 'Perímetro Cintura',
      totalProgress: 'Progreso Total:',
      fat: 'Grasa',
      muscle: 'Músculo',
      athleteGoal: 'Objetivo del Atleta:',
      autoSyncOn: 'SYNC AUTOMÁTICA ON',
      anabolicVerdictTitle: 'VEREDICTO TELEMÉTRICO // HIPERTROFIA CERTIFICADA',
      anabolicVerdictBadge: 'ESTADO ANABÓLICO: EXCELENTE 🔥',
      massIncreasingTitle: '¡Tu masa muscular está aumentando!',
      massIncreasingDesc: 'Los datos de bioimpedancia certifican una recomposición corporal de élite: ganas tejido muscular contráctil mientras la grasa disminuye constantemente.',
      pureMuscle: 'Masa Muscular Pura',
      contractileTissue: 'tejido contráctil',
      fatLost: 'Grasa Corporal Perdida',
      fatDropped: 'Grasa reducida',
      muscleDensity: 'Densidad Muscular',
      ofYourBody: 'de tu peso corporal',
      metabolicBoost: 'Impulso Metabólico',
      burnedAtRest: 'al día quemadas en reposo',
      coachAnalysisTitle: 'Análisis Telemétrico del Coach Alessandro',
      coachQuote: '"Los datos BIA no mienten: la sobrecarga progresiva está generando hipertrofia real. El músculo crece a buen ritmo y la grasa visceral ha bajado. ¡Sigue con esta disciplina!"',
      radarTitle: 'RADAR DE RECOMPOSICIÓN CORPORAL',
      radarSubtitle: 'Curva Músculo (Sube ↗) vs Grasa (Baja ↘)',
      muscleTrend: 'Tendencia Masa Muscular:',
      fatTrend: 'Tendencia Grasa Corporal:',
      palmaresTitle: 'PALMARÉS ATLETA',
      achievementsTitle: 'Logros y Trofeos Desbloqueados',
      unlockedRatio: 'DESBLOQUEADOS',
      unlockedBadge: '✨ DESBLOQUEADO',
      overloadTitle: 'TELEMETRÍA DE SOBRECARGA PROGRESIVA',
      strengthGainTitle: 'Ganancia de Fuerza vs Mes Anterior',
      maxStrengthBadge: 'FUERZA MÁXIMA ↗',
      totalStrengthGainBanner: 'INCREMENTO TOTAL DE FUERZA EN BÁSICOS:',
      gained: 'ganados',
      strengthGainDesc: 'En comparación con el mes anterior, tu capacidad de carga neural y contráctil en los multiarticulares ha aumentado sólidamente.',
      sessionVolume: 'Volumen por Sesión',
      keyExercise: 'Ejercicio Básico Principal',
      loadProgression: 'Progresión de Cargas (Mes Pasado ➔ Hoy)',
      prevMonth: 'Mes Pasado',
      today: 'Hoy',
      directCheckinTitle: 'CHECK-IN DIRECTO DEL ATLETA',
      recordMeasurement: 'Registrar Medición de Hoy',
      quickCheckinTime: 'Rápido • 30 seg',
      weightLabelStep: '1. Peso de Hoy (en ayunas)',
      valueInKg: 'valor en kg',
      waistLabelStep: '2. Perímetro Abdominal / Cintura',
      waistMeasuredAt: 'medido a la altura del ombligo',
      energyLabelStep: '3. Nivel de Energía y Recuperación Hoy',
      fatigued: '1 = Fatigado',
      fullStrength: '5 = Fuerza Total',
      sleepQuality: 'Calidad del Sueño',
      sleepOptimal: '🌙 Profundo (7-8 horas)',
      sleepFair: '😐 Discreto (~6 horas)',
      sleepPoor: '🥱 Escaso / Interrumpido (<5h)',
      hydrationYesterday: 'Hidratación Ayer',
      hydrationOptimal: '💧 3 Litros (Óptima)',
      hydrationNormal: '💧 2 Litros (Normal)',
      hydrationLow: '💧 Menos de 1.5L (Baja)',
      notesForCoach: '4. Notas y Sensaciones para el Coach Alessandro',
      notesPlaceholder: 'Ej. Gran recuperación en piernas, apetito controlado, listo para series pesadas...',
      sendCheckinBtn: 'ENVIAR CHECK-IN AL COACH ALESSANDRO',
      checkinSuccessToast: '🚀 ¡Check-in corporal enviado con éxito al Coach Alessandro!',
      historyTitle: 'Historial de Check-in y BIA',
      readingsCount: 'Registros',
      clinicalBiaBadge: '🩺 BIA CLÍNICA PT',
      selfCheckinBadge: '⚖️ CHECK-IN ATLETA',
      fatShort: 'Grasa',
      muscleShort: 'Músculo',
      waterShort: 'Agua',
      waistShort: 'Cintura',
      strengthGainSummary: '¡Fuerza aumentada en +22.5 kg respecto al mes anterior! 🔥',
      restFor: 'Descanso de',
      resumeWorkout: 'Reanudar ➔',
      pauseWorkout: 'Pausar entrenamiento'
    },
    restTimer: {
      tag: 'CRONÓMETRO // RECUPERACIÓN',
      targetEx: 'Ejercicio Objetivo',
      atpRecharge: 'Recarga ATP:',
      readyBtn: 'LISTO'
    },
    upgrade: {
      badge: 'MODELO SAAS B2B POR TRAMOS',
      title: 'Gestión de Planes y Suscripción Coach',
      desc: 'Los atletas acceden 100% GRATIS con tu código. Desbloquea más plazas a medida que crece tu cartera de clientes.',
      statusTitle: 'Ocupación de Plazas',
      registeredAthletes: 'ATLETAS REGISTRADOS',
      stripeB2BNotice: 'Facturación B2B directa con Stripe (0% comisión de app store)',
      coachFavorite: 'MÁS ELEGIDO',
      activeBadge: 'PLAN ACTIVO',
      perMonth: '/ mes',
      capacityLabel: 'CAPACIDAD DE ATLETAS:',
      upToAthletes: 'HASTA {X} ATLETAS ACTIVOS',
      currentPlanBtn: 'PLAN ACTUAL',
      upgradeTierBtn: 'SUBIR A ESTE PLAN',
      gatekeeperRule: 'Al llenarse, puedes archivar clientes inactivos o subir de plan al instante.',
      closeBtn: 'Cerrar'
    },
    videoModal: {
      tempo: 'CADENCIA:',
      officialCoachVideo: 'Vídeo Oficial Grabado por el Coach',
      demoVideo: 'Vídeo Demostrativo',
      eccentricConcentric: 'FASE EXCÉNTRICA (3S) → CONCÉNTRICA (1S)',
      slowMo: '0.5x Cámara Lenta',
      normalSpeed: '1.0x Normal',
      gymClipTitle: 'Vídeo del Coach en gimnasio: ¡puedes reemplazar esta demostración con tu propio clip!',
      cancel: 'Cancelar',
      customUploadBtn: '+ Pegar Enlace o Subir tu Vídeo',
      customUploadLabel: 'Enlace del Vídeo del Coach (YouTube, Vimeo, MP4, Google Drive, etc.)',
      customUploadPlaceholder: 'https://... enlace a tu vídeo guía',
      save: 'Guardar',
      customUploadTip: '💡 Puedes pegar cualquier enlace de vídeo MP4 o subir un archivo desde tu móvil para mostrar tu técnica personalizada.',
      cuesTitle: 'Puntos Clave Biomecánicos (Coaching Cues)',
      mistakesTitle: 'Errores Comunes a Evitar',
      coachNoteTitle: 'Nota Específica del Coach Alessandro:',
      sendExecutionToCoach: 'Enviar tu ejecución al Coach',
      understoodReturn: 'Entendido, Volver a la Rutina'
    },
    routineModal: {
      focusWomen: '🌸 Enfoque Mujer',
      focusMen: '⚡ Enfoque Hombre',
      unisexRecomp: '🌐 Unisex / Recomp',
      perWeek: 'X / SEMANA',
      minEstimated: 'MIN',
      totalExercises: 'EJERCICIOS TOTALES',
      goalProtocol: 'Objetivo del Protocolo:',
      tabAssign: 'Asignación de Atletas',
      tabExercises: 'Detalle de Ejercicios y Cargas',
      assignTitle: '¿A quién deseas asignar esta rutina?',
      assignSubtitle: 'Selecciona atletas del equipo. Al confirmar, la rutina se activará de inmediato para ellos.',
      searchPlaceholder: 'Buscar atleta por nombre u objetivo...',
      currentlyActive: '✅ Actualmente Activa',
      goalLabel: 'Objetivo:',
      todayRoutine: 'Rutina Actual',
      noRoutine: 'Ninguna',
      splitStructure: 'ESTRUCTURA DE SPLIT',
      daySingular: 'SESIÓN',
      dayPlural: 'SESIONES',
      frequency: 'Frecuencia:',
      restSeconds: 'DESCANSO',
      setsCol: 'Serie',
      targetLoadCol: 'Carga Objetivo',
      repsCol: 'Repeticiones',
      setTypeCol: 'Tipo Serie',
      setWord: 'SERIE',
      prBadge: '🏆 RÉCORD',
      standardBadge: 'ESTÁNDAR',
      deleteBtn: 'Eliminar',
      editBuilderBtn: 'Editar en Constructor',
      selectedCount: 'atletas seleccionados',
      confirmAssignBtn: 'Confirmar Asignación',
      selectAtLeastOneError: '⚠️ Selecciona al menos un atleta para asignar la rutina.',
      deleteConfirm: '¿Seguro que deseas eliminar esta rutina de la biblioteca?'
    },
    toasts: {
      setDone: '¡Serie registrada!',
      prRecord: '🏆 ¡NUEVO RÉCORD PERSONAL! {weight} kg en {exercise}!',
      timerDone: '⏰ ¡Descanso finalizado para {exercise}! Listo para la siguiente serie.',
      planUpgraded: '🎉 ¡Plan actualizado a {plan}! Capacidad ampliada a {slots} atletas.',
      athleteAdded: '✅ ¡Atleta {name} añadido! Plazas libres: {free}.',
      athleteArchived: '📦 Atleta archivado. ¡Plaza liberada!',
      athleteRestored: '✅ Atleta restaurado con éxito.',
      routineSaved: '🎉 ¡Rutina "{title}" guardada y asignada al atleta!',
      workoutFinished: '🚀 ¡Entrenamiento sincronizado! El coach recibió la notificación.',
      reviewedMarked: 'Alerta revisada y resuelta.',
      slotLimitError: '⚠️ Límite de {slots} atletas alcanzado. Mejora tu plan para añadir más.'
    }
  }
};

export const EXERCISE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'panca piana con bilanciere': {
    it: 'Panca Piana con Bilanciere',
    en: 'Barbell Flat Bench Press',
    es: 'Press de Banca Plano con Barra'
  },
  'panca piana bilanciere': {
    it: 'Panca Piana Bilanciere',
    en: 'Barbell Bench Press',
    es: 'Press de Banca con Barra'
  },
  'distensioni manubri panca 30°': {
    it: 'Distensioni Manubri Panca 30°',
    en: 'Incline Dumbbell Press (30°)',
    es: 'Press Inclinado con Mancuernas (30°)'
  },
  'spinte manubri su panca inclinata': {
    it: 'Spinte Manubri su Panca Inclinata',
    en: 'Incline Dumbbell Press',
    es: 'Press Inclinado con Mancuernas'
  },
  'military press': {
    it: 'Military Press',
    en: 'Overhead Military Press',
    es: 'Press Militar con Barra'
  },
  'military press (spalle)': {
    it: 'Military Press (Spalle)',
    en: 'Overhead Military Press',
    es: 'Press Militar con Barra'
  },
  'french press bilanciere sagomato': {
    it: 'French Press Bilanciere Sagomato',
    en: 'EZ-Bar French Press',
    es: 'Press Francés con Barra EZ'
  },
  'french press con bilanciere ez': {
    it: 'French Press con Bilanciere EZ',
    en: 'EZ-Bar French Press',
    es: 'Press Francés con Barra EZ'
  },
  'trazioni alla sbarra': {
    it: 'Trazioni alla Sbarra',
    en: 'Pull-Ups',
    es: 'Dominadas'
  },
  'rematore con bilanciere': {
    it: 'Rematore con Bilanciere',
    en: 'Barbell Bent-Over Row',
    es: 'Remo con Barra'
  },
  'pulley basso': {
    it: 'Pulley Basso',
    en: 'Seated Cable Row',
    es: 'Remo en Polea Baja'
  },
  'pulley basso al cavo': {
    it: 'Pulley Basso al Cavo',
    en: 'Seated Cable Row',
    es: 'Remo en Polea Baja'
  },
  'curl bicipiti su panca inclinata': {
    it: 'Curl Bicipiti su Panca Inclinata',
    en: 'Incline Dumbbell Bicep Curl',
    es: 'Curl de Bíceps en Banco Inclinado'
  },
  'curl con manubri su panca inclinata': {
    it: 'Curl con Manubri su Panca Inclinata',
    en: 'Incline Dumbbell Bicep Curl',
    es: 'Curl de Bíceps en Banco Inclinado'
  },
  'curl con bilanciere ez': {
    it: 'Curl con Bilanciere EZ',
    en: 'EZ-Bar Bicep Curl',
    es: 'Curl de Bíceps con Barra EZ'
  },
  'squat con bilanciere': {
    it: 'Squat con Bilanciere',
    en: 'Barbell Back Squat',
    es: 'Sentadilla con Barra'
  },
  'stacco da terra rumeno': {
    it: 'Stacco da Terra Rumeno',
    en: 'Romanian Deadlift (RDL)',
    es: 'Peso Muerto Rumano'
  },
  'stacco rumeno con manubri': {
    it: 'Stacco Rumeno con Manubri',
    en: 'Dumbbell Romanian Deadlift',
    es: 'Peso Muerto Rumano con Mancuernas'
  },
  'leg press 45°': {
    it: 'Leg Press 45°',
    en: '45° Leg Press',
    es: 'Prensa de Piernas 45°'
  },
  'leg press a 45°': {
    it: 'Leg Press a 45°',
    en: '45° Leg Press',
    es: 'Prensa de Piernas 45°'
  },
  'calf machine in piedi': {
    it: 'Calf Machine in Piedi',
    en: 'Standing Calf Raise',
    es: 'Elevación de Gemelos de Pie'
  },
  'hip thrust con bilanciere': {
    it: 'Hip Thrust con Bilanciere',
    en: 'Barbell Hip Thrust',
    es: 'Hip Thrust con Barra'
  },
  'bulgarian split squat': {
    it: 'Bulgarian Split Squat',
    en: 'Bulgarian Split Squat',
    es: 'Sentadilla Búlgara'
  },
  'affondi camminati': {
    it: 'Affondi Camminati',
    en: 'Walking Lunges',
    es: 'Zancadas Caminando'
  },
  'leg curl sdraiato': {
    it: 'Leg Curl Sdraiato',
    en: 'Lying Leg Curl',
    es: 'Curl Femoral Tumbado'
  },
  'alzate laterali con manubri': {
    it: 'Alzate Laterali con Manubri',
    en: 'Dumbbell Lateral Raises',
    es: 'Elevaciones Laterales con Mancuernas'
  },
  'alzate laterali manubri': {
    it: 'Alzate Laterali Manubri',
    en: 'Dumbbell Lateral Raises',
    es: 'Elevaciones Laterales con Mancuernas'
  },
  'dips alle parallele': {
    it: 'Dips alle Parallele',
    en: 'Parallel Bar Dips',
    es: 'Fondos en Paralelas'
  },
  'dip alle parallele': {
    it: 'Dip alle Parallele',
    en: 'Parallel Bar Dips',
    es: 'Fondos en Paralelas'
  },
  'lat machine presa inversa': {
    it: 'Lat Machine Presa Inversa',
    en: 'Reverse-Grip Lat Pulldown',
    es: 'Jalón al Pecho Agarre Invertido'
  },
  'plank addominale': {
    it: 'Plank Addominale',
    en: 'Abdominal Plank',
    es: 'Plancha Abdominal'
  },
  'crunch al cavo': {
    it: 'Crunch al Cavo',
    en: 'Cable Crunch',
    es: 'Crunch en Polea'
  }
};

export const translateRoutineTitle = (title: string, lang: Language): string => {
  if (lang === 'it' || !title) return title;
  const t = title.toLowerCase();
  if (t.includes('ipertrofia') && (t.includes('spinta') || t.includes('uomo'))) {
    if (lang === 'en') return "Men's Hypertrophy: Push / Pull / Legs (3x/Week)";
    if (lang === 'es') return "Hipertrofia Masculina: Empuje / Tirón / Piernas (3x/Sem.)";
  }
  if (t.includes('booty') || t.includes('glutei') || t.includes('donna')) {
    if (lang === 'en') return "Women's Glute & Tone Protocol (4x/Week)";
    if (lang === 'es') return "Protocolo Glúteos y Tono Femenino (4x/Sem.)";
  }
  if (t.includes('forza') || t.includes('power')) {
    if (lang === 'en') return 'Strength & Power Protocol';
    if (lang === 'es') return 'Protocolo de Fuerza y Potencia';
  }
  if (t.includes('personalizzato')) {
    if (lang === 'en') return 'Custom Multi-Split Protocol';
    if (lang === 'es') return 'Protocolo Personalizado Multi-Split';
  }
  return title;
};

export const translateSplitName = (name: string, lang: Language): string => {
  if (lang === 'it' || !name) return name;
  let translated = name;
  if (lang === 'en') {
    translated = translated
      .replace(/Lunedì/gi, 'Monday')
      .replace(/Martedì/gi, 'Tuesday')
      .replace(/Mercoledì/gi, 'Wednesday')
      .replace(/Giovedì/gi, 'Thursday')
      .replace(/Venerdì/gi, 'Friday')
      .replace(/Sabato/gi, 'Saturday')
      .replace(/Domenica/gi, 'Sunday');
  } else if (lang === 'es') {
    translated = translated
      .replace(/Lunedì/gi, 'Lunes')
      .replace(/Martedì/gi, 'Martes')
      .replace(/Mercoledì/gi, 'Miércoles')
      .replace(/Giovedì/gi, 'Jueves')
      .replace(/Venerdì/gi, 'Viernes')
      .replace(/Sabato/gi, 'Sábado')
      .replace(/Domenica/gi, 'Domingo');
  }
  return translated;
};

export const translateExerciseName = (name: string, lang: Language): string => {
  if (lang === 'it' || !name) return name;
  const key = name.toLowerCase().trim();
  if (EXERCISE_TRANSLATIONS[key] && EXERCISE_TRANSLATIONS[key][lang]) {
    return EXERCISE_TRANSLATIONS[key][lang];
  }
  for (const [k, v] of Object.entries(EXERCISE_TRANSLATIONS)) {
    if (key.includes(k) && v[lang]) {
      return v[lang];
    }
  }
  return name;
};

export const translateMuscleName = (muscle: string, lang: Language): string => {
  if (lang === 'it' || !muscle) return muscle;
  const m = muscle.toLowerCase();
  if (lang === 'en') {
    if (m.includes('pett')) return 'Chest';
    if (m.includes('spall')) return 'Shoulders';
    if (m.includes('dors')) return 'Back';
    if (m.includes('bicip')) return 'Biceps';
    if (m.includes('tricip')) return 'Triceps';
    if (m.includes('bracc')) return 'Arms';
    if (m.includes('gamb')) return 'Legs';
    if (m.includes('glut')) return 'Glutes';
    if (m.includes('addom') || m.includes('core')) return 'Core';
    if (m.includes('polpacc') || m.includes('calf')) return 'Calves';
    if (m.includes('spinta')) return 'Push: Chest, Shoulders & Triceps';
    if (m.includes('trazion') || m.includes('tirat')) return 'Pull: Back & Biceps';
  } else if (lang === 'es') {
    if (m.includes('pett')) return 'Pecho';
    if (m.includes('spall')) return 'Hombros';
    if (m.includes('dors')) return 'Espalda';
    if (m.includes('bicip')) return 'Bíceps';
    if (m.includes('tricip')) return 'Tríceps';
    if (m.includes('bracc')) return 'Brazos';
    if (m.includes('gamb')) return 'Piernas';
    if (m.includes('glut')) return 'Glúteos';
    if (m.includes('addom') || m.includes('core')) return 'Core';
    if (m.includes('polpacc') || m.includes('calf')) return 'Gemelos';
    if (m.includes('spinta')) return 'Empuje: Pecho, Hombros y Tríceps';
    if (m.includes('trazion') || m.includes('tirat')) return 'Tirón: Espalda y Bíceps';
  }
  return muscle;
};

export const translateTrainerNotes = (notes: string, lang: Language): string => {
  if (lang === 'it' || !notes) return notes;
  const n = notes.toLowerCase();
  if (lang === 'en') {
    if (n.includes('fermo al petto')) {
      return '1-second chest pause. Keep elbows tucked at 45° relative to torso.';
    }
    if (n.includes('contrazione di picco') || n.includes('fermo 2 secondi')) {
      return '2-second peak contraction at the top. Controlled eccentric descent.';
    }
    if (n.includes('rom completo') || n.includes('sotto il parallelo')) {
      return 'Full depth below parallel. Keep chest up and lumbar neutral.';
    }
    if (n.includes('bacino spinto indietro')) {
      return 'Push hips back (hip hinge), controlled stretch on hamstrings.';
    }
  } else if (lang === 'es') {
    if (n.includes('fermo al petto')) {
      return 'Pausa de 1 segundo en el pecho. Codos a 45° respecto al torso.';
    }
    if (n.includes('contrazione di picco') || n.includes('fermo 2 secondi')) {
      return 'Contracción de 2 segundos en el punto máximo. Descenso excéntrico controlado.';
    }
    if (n.includes('rom completo') || n.includes('sotto il parallelo')) {
      return 'Profundidad por debajo del paralelo. Pecho erguido y columna neutra.';
    }
    if (n.includes('bacino spinto indietro')) {
      return 'Cadera hacia atrás (hip hinge), estiramiento controlado de femorales.';
    }
  }
  return notes;
};
