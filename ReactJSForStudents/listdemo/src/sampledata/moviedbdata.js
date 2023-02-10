
//obtained this data from movie db

// https://api.themoviedb.org/3/search/movie?api_key=APIKEY&language=en-US&query=batman&page=1&include_adult=false

var movieDataObject = {

    constructor() {

        this.movieData = {
            "page": 1,
            "results": [
                {
                    "adult": false,
                    "backdrop_path": "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
                    "genre_ids": [
                        80,
                        9648,
                        53
                    ],
                    "id": 414906,
                    "original_language": "en",
                    "original_title": "The Batman",
                    "overview": "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
                    "popularity": 223.862,
                    "poster_path": "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
                    "release_date": "2022-03-02",
                    "title": "The Batman",
                    "video": false,
                    "vote_average": 7.7,
                    "vote_count": 7436
                },
                {
                    "adult": false,
                    "backdrop_path": "/ew5FcYiRhTYNJAkxoVPMNlCOdVn.jpg",
                    "genre_ids": [
                        28,
                        80,
                        18
                    ],
                    "id": 272,
                    "original_language": "en",
                    "original_title": "Batman Begins",
                    "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
                    "popularity": 51.55,
                    "poster_path": "/8RW2runSEc34IwKN2D1aPcJd2UL.jpg",
                    "release_date": "2005-06-10",
                    "title": "Batman Begins",
                    "video": false,
                    "vote_average": 7.7,
                    "vote_count": 18708
                },
                {
                    "adult": false,
                    "backdrop_path": "/2va32apQP97gvUxaMnL5wYt4CRB.jpg",
                    "genre_ids": [
                        14,
                        28,
                        80
                    ],
                    "id": 268,
                    "original_language": "en",
                    "original_title": "Batman",
                    "overview": "Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham's criminal underworld.",
                    "popularity": 33.012,
                    "poster_path": "/7xiCfaVZXfNPhZ5e9YqsjWR0oLz.jpg",
                    "release_date": "1989-06-23",
                    "title": "Batman",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 6742
                },
                {
                    "adult": false,
                    "backdrop_path": "/3WP0RObZ2t7ShHfqQpKPljF9B22.jpg",
                    "genre_ids": [
                        28,
                        14
                    ],
                    "id": 364,
                    "original_language": "en",
                    "original_title": "Batman Returns",
                    "overview": "While Batman deals with a deformed man calling himself the Penguin, an employee of a corrupt businessman transforms into the Catwoman.",
                    "popularity": 26.26,
                    "poster_path": "/jKBjeXM7iBBV9UkUcOXx3m7FSHY.jpg",
                    "release_date": "1992-06-19",
                    "title": "Batman Returns",
                    "video": false,
                    "vote_average": 6.9,
                    "vote_count": 5639
                },
                {
                    "adult": false,
                    "backdrop_path": "/eevJuYAitUe6VwFN29aFwzeyeTr.jpg",
                    "genre_ids": [
                        28,
                        16,
                        80,
                        9648
                    ],
                    "id": 537056,
                    "original_language": "en",
                    "original_title": "Batman: Hush",
                    "overview": "A mysterious new villain known only as Hush uses a gallery of villains to destroy Batman's crime-fighting career as well as Bruce Wayne's personal life, which has been further complicated by a relationship with Selina Kyle/Catwoman.",
                    "popularity": 17.417,
                    "poster_path": "/eiVQORVyVuNNZHPAELuWtlXoQsD.jpg",
                    "release_date": "2019-07-19",
                    "title": "Batman: Hush",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 718
                },
                {
                    "adult": false,
                    "backdrop_path": "/snlu32RmjldF9b068UURJg8sQtn.jpg",
                    "genre_ids": [
                        28,
                        80,
                        14
                    ],
                    "id": 414,
                    "original_language": "en",
                    "original_title": "Batman Forever",
                    "overview": "Batman must battle a disfigured district attorney and a disgruntled former employee with help from an amorous psychologist and a young circus acrobat.",
                    "popularity": 24.435,
                    "poster_path": "/mzzNBVwTiiY94xAXDMWJpNPW2US.jpg",
                    "release_date": "1995-06-16",
                    "title": "Batman Forever",
                    "video": false,
                    "vote_average": 5.4,
                    "vote_count": 4553
                },
                {
                    "adult": false,
                    "backdrop_path": "/m4UT6yKXhXgbzxpeV35L4jLoJoP.jpg",
                    "genre_ids": [
                        28,
                        878,
                        12,
                        35
                    ],
                    "id": 415,
                    "original_language": "en",
                    "original_title": "Batman & Robin",
                    "overview": "Batman and Robin deal with relationship issues while preventing Mr. Freeze and Poison Ivy from attacking Gotham City.",
                    "popularity": 23.846,
                    "poster_path": "/cGRDufDDSrFrv7VI4YnmWnslne0.jpg",
                    "release_date": "1997-06-20",
                    "title": "Batman & Robin",
                    "video": false,
                    "vote_average": 4.3,
                    "vote_count": 4403
                },
                {
                    "adult": false,
                    "backdrop_path": "/doiUtOHzcxXFl0GVQ2n8Ay6Pirx.jpg",
                    "genre_ids": [
                        28,
                        12,
                        14
                    ],
                    "id": 209112,
                    "original_language": "en",
                    "original_title": "Batman v Superman: Dawn of Justice",
                    "overview": "Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior, while the world wrestles with what sort of hero it really needs. And with Batman and Superman at war with one another, a new threat quickly arises, putting mankind in greater danger than it’s ever known before.",
                    "popularity": 62.739,
                    "poster_path": "/5UsK3grJvtQrtzEgqNlDljJW96w.jpg",
                    "release_date": "2016-03-23",
                    "title": "Batman v Superman: Dawn of Justice",
                    "video": false,
                    "vote_average": 5.9,
                    "vote_count": 16488
                },
                {
                    "adult": false,
                    "backdrop_path": "/bxxupqG6TBLKC60M6L8iOvbQEr6.jpg",
                    "genre_ids": [
                        28,
                        35,
                        80
                    ],
                    "id": 2661,
                    "original_language": "en",
                    "original_title": "Batman",
                    "overview": "The Dynamic Duo faces four super-villains who plan to hold the world for ransom with the help of a secret invention that instantly dehydrates people.",
                    "popularity": 14.508,
                    "poster_path": "/zzoPxWHnPa0eyfkMLgwbNvdEcVF.jpg",
                    "release_date": "1966-07-30",
                    "title": "Batman",
                    "video": false,
                    "vote_average": 6.3,
                    "vote_count": 709
                },
                {
                    "adult": false,
                    "backdrop_path": "/8VSaa8ZCy43zm7aRzsyCnKOfarm.jpg",
                    "genre_ids": [
                        16,
                        28,
                        878
                    ],
                    "id": 886396,
                    "original_language": "en",
                    "original_title": "Batman and Superman: Battle of the Super Sons",
                    "overview": "After discovering he has powers, 11-year-old Jonathan Kent and assassin-turned-Boy-Wonder Damian Wayne must join forces to rescue their fathers (Superman & Batman) and save the planet from the malevolent alien force known as Starro.",
                    "popularity": 105.449,
                    "poster_path": "/mvffaexT5kA3chOnGxwBSlRoshh.jpg",
                    "release_date": "2022-10-18",
                    "title": "Batman and Superman: Battle of the Super Sons",
                    "video": false,
                    "vote_average": 7.9,
                    "vote_count": 172
                },
                {
                    "adult": false,
                    "backdrop_path": "/nwfpBjtMNFwrGjW2o9HBhMEYCpM.jpg",
                    "genre_ids": [
                        878,
                        28,
                        16
                    ],
                    "id": 366924,
                    "original_language": "en",
                    "original_title": "Batman: Bad Blood",
                    "overview": "Bruce Wayne is missing. Alfred covers for him while Nightwing and Robin patrol Gotham City in his stead and a new player, Batwoman, investigates Batman's disappearance.",
                    "popularity": 19.332,
                    "poster_path": "/1UmPJWfaivtNjsScJqcsbsQRGNY.jpg",
                    "release_date": "2016-08-04",
                    "title": "Batman: Bad Blood",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 644
                },
                {
                    "adult": false,
                    "backdrop_path": "/kU7ZiyeUwcpTkYj3UcxSqGdZmxY.jpg",
                    "genre_ids": [
                        16,
                        28
                    ],
                    "id": 618353,
                    "original_language": "en",
                    "original_title": "Batman: Death in the Family",
                    "overview": "Tragedy strikes the Batman's life again when Robin Jason Todd tracks down his birth mother only to run afoul of the Joker. An adaptation of the 1988 comic book storyline of the same name.",
                    "popularity": 34.383,
                    "poster_path": "/k8Q9ulyRE8fkvZMkAM9LPYMKctb.jpg",
                    "release_date": "2020-10-13",
                    "title": "Batman: Death in the Family",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 361
                },
                {
                    "adult": false,
                    "backdrop_path": "/4p9MrndEp154yxknw0WOwr3VaVq.jpg",
                    "genre_ids": [
                        16,
                        28,
                        35,
                        10751
                    ],
                    "id": 324849,
                    "original_language": "en",
                    "original_title": "The Lego Batman Movie",
                    "overview": "A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.",
                    "popularity": 30.509,
                    "poster_path": "/snGwr2gag4Fcgx2OGmH9otl6ofW.jpg",
                    "release_date": "2017-02-08",
                    "title": "The Lego Batman Movie",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 4345
                },
                {
                    "adult": false,
                    "backdrop_path": "/otumLIRpsQqy4gROSGQ8LjxHGsL.jpg",
                    "genre_ids": [
                        878,
                        28,
                        12,
                        16,
                        10751
                    ],
                    "id": 45162,
                    "original_language": "en",
                    "original_title": "Superman/Batman: Apocalypse",
                    "overview": "Batman discovers a mysterious teen-aged girl with superhuman powers and a connection to Superman. When the girl comes to the attention of Darkseid, the evil overlord of Apokolips, events take a decidedly dangerous turn.",
                    "popularity": 21.283,
                    "poster_path": "/d7gHmsA2o5Z1MhcuspMyOSO48KB.jpg",
                    "release_date": "2010-09-28",
                    "title": "Superman/Batman: Apocalypse",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 591
                },
                {
                    "adult": false,
                    "backdrop_path": "/jvRewPpawHAfBW38EzHoFdTVEez.jpg",
                    "genre_ids": [
                        16,
                        28,
                        12,
                        80,
                        14
                    ],
                    "id": 732450,
                    "original_language": "en",
                    "original_title": "Batman: Soul of the Dragon",
                    "overview": "Bruce Wayne faces a deadly menace from his past, with the help of three former classmates: world-renowned martial artists Richard Dragon, Ben Turner and Lady Shiva.",
                    "popularity": 25.872,
                    "poster_path": "/uDhnTtSxU5a8DtZdbbin3aZmkmU.jpg",
                    "release_date": "2021-01-12",
                    "title": "Batman: Soul of the Dragon",
                    "video": false,
                    "vote_average": 6.9,
                    "vote_count": 275
                },
                {
                    "adult": false,
                    "backdrop_path": "/4aJPdkPLnLiiCbfu6WFUQzER3u0.jpg",
                    "genre_ids": [
                        878,
                        28,
                        12,
                        16
                    ],
                    "id": 321528,
                    "original_language": "en",
                    "original_title": "Batman vs. Robin",
                    "overview": "Damian Wayne is having a hard time coping with his father's \"no killing\" rule. Meanwhile, Gotham is going through hell with threats such as the insane Dollmaker, and the secretive Court of Owls.",
                    "popularity": 13.366,
                    "poster_path": "/aGp9XDXmVM5lCKHWtgBC15S7XLr.jpg",
                    "release_date": "2015-04-14",
                    "title": "Batman vs. Robin",
                    "video": false,
                    "vote_average": 7.2,
                    "vote_count": 791
                },
                {
                    "adult": false,
                    "backdrop_path": "/2toE0K6Zgz5kLqWLo4m5bP4YQIG.jpg",
                    "genre_ids": [
                        28,
                        16,
                        80,
                        18
                    ],
                    "id": 382322,
                    "original_language": "en",
                    "original_title": "Batman: The Killing Joke",
                    "overview": "As Batman hunts for the escaped Joker, the Clown Prince of Crime attacks the Gordon family to prove a diabolical point mirroring his own fall into madness.",
                    "popularity": 18.095,
                    "poster_path": "/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg",
                    "release_date": "2016-07-24",
                    "title": "Batman: The Killing Joke",
                    "video": false,
                    "vote_average": 6.6,
                    "vote_count": 1588
                },
                {
                    "adult": false,
                    "backdrop_path": "/3xnfbtgJmVotajqM57iKib3ftnT.jpg",
                    "genre_ids": [
                        878,
                        80,
                        28,
                        16,
                        9648
                    ],
                    "id": 40662,
                    "original_language": "en",
                    "original_title": "Batman: Under the Red Hood",
                    "overview": "One part vigilante, one part criminal kingpin, Red Hood begins cleaning up Gotham with the efficiency of Batman, but without following the same ethical code.",
                    "popularity": 22.3,
                    "poster_path": "/7lmHqHg1rG9b4U8MjuyQjmJ7Qm0.jpg",
                    "release_date": "2010-07-27",
                    "title": "Batman: Under the Red Hood",
                    "video": false,
                    "vote_average": 7.8,
                    "vote_count": 1371
                },
                {
                    "adult": false,
                    "backdrop_path": "/bAM1hVZEQRo1ZujryQ47bOtxEe8.jpg",
                    "genre_ids": [
                        53,
                        16,
                        28,
                        80
                    ],
                    "id": 242643,
                    "original_language": "en",
                    "original_title": "Batman: Assault on Arkham",
                    "overview": "Batman works desperately to find a bomb planted by the Joker while Amanda Waller sends her newly-formed Suicide Squad to break into Arkham Asylum and recover vital information stolen by the Riddler.",
                    "popularity": 16.421,
                    "poster_path": "/mmQZekxr9gJ7c0Grkx6xgKvrpDy.jpg",
                    "release_date": "2014-08-12",
                    "title": "Batman: Assault on Arkham",
                    "video": false,
                    "vote_average": 7.4,
                    "vote_count": 972
                },
                {
                    "adult": false,
                    "backdrop_path": "/7eFRxrUpEmXSRaQnSEum3hjmu9c.jpg",
                    "genre_ids": [
                        16,
                        10751,
                        28,
                        878
                    ],
                    "id": 16234,
                    "original_language": "en",
                    "original_title": "Batman Beyond: Return of the Joker",
                    "overview": "The Joker is back with a vengeance, and Gotham's newest Dark Knight, Terry McGinnis, needs answers as he stands alone to face Gotham's most infamous Clown Prince of Crime.",
                    "popularity": 29.393,
                    "poster_path": "/7RlBs0An83fqAuKfwH5gKMcqgMc.jpg",
                    "release_date": "2000-12-12",
                    "title": "Batman Beyond: Return of the Joker",
                    "video": false,
                    "vote_average": 7.3,
                    "vote_count": 952
                }
            ],
            "total_pages": 8,
            "total_results": 141
        }
    },
    getMovieData() {

        return this.movieData.results;

    },

    getMovieDataById(id) {
        //console.log(`getMovieDataById(${id})`);
        //console.log(this.movieData.results);
        const movie = this.movieData.results.find((movie) => movie.id == id);
        //console.log(movie);
        return movie;
    
    },

    getMovieImageBaseURL() {
        let imageURLBase = `https://www.themoviedb.org/t/p/original`;
        return imageURLBase;
    },
}

export default movieDataObject;


