let mock = [
    {
        id:1,
        name: "Donovan Mitchell",
        team: "Utah Jazz",
        position: "Guard",
        stats: {
            fieldGoal: 42.3,
            assists: 5.4,
            rebounds: 4.5,
            steals: 1.0
        },
        rating: 90,
        image: "Mitchell"
    },
    {
        id:2,
        name: "Anthony Daivs",
        team: "Los Angeles Lakers",
        position: "Center",
        stats: {
            fieldGoal: 53.3,
            assists: 3.0,
            rebounds: 8.4,
            steals: 0.8
        },
        rating: 97,
        image: "Davis"
    },
    {
        id:3,
        name: "Devin Booker",
        team: "Phoenix Suns",
        position: "Guard",
        stats: {
            fieldGoal: 50.1,
            assists: 4.7,
            rebounds: 3.7,
            steals: 0.8
        },
        rating: 92,
        image: "Booker"
    },
    {
        id: 4,
        name: "Kawhi Leonard",
        team: "Los Angeles Clippers",
        position: "Forward",
        stats: {
            fieldGoal: 51.2,
            assists: 4.9,
            rebounds: 6.4,
            steals: 1.6
        },
        rating: 93,
        image: "Leonard"
    },
    {
        id: 5,
        name: "Michael Porter Jr.",
        team: "Denver Nuggets",
        position: "Forward",
        stats: {
            fieldGoal: 52.5,
            assists: 0.8,
            rebounds: 7.4,
            steals: 0.8
        },
        rating: 86,
        image: "Porter"
    },
    {
        id: 6,
        name: "CJ McCollum",
        team: "Portland Trail Blazers",
        position: "Guard",
        stats: {
            fieldGoal: 44.9,
            assists: 4.6,
            rebounds: 3.8,
            steals: 1.2
        },
        rating: 89,
        image: "McCollum"
    },
    {
        id: 7,
        name: "Lonnie Walker IV",
        team: "San Antonio Spurs",
        position: "Forward",
        stats: {
            fieldGoal: 41.4,
            assists: 1.7,
            rebounds: 2.8,
            steals: 0.5
        },
        rating: 83,
        image: "WalkerIV"
    },
    {
        id:8,
        name: "Kristaps Porzingis",
        team: "Dallas Mavericks",
        position: "Center",
        stats: {
            fieldGoal: 48.7,
            assists: 1.2,
            rebounds: 8.6,
            steals: 0.4
        },
        rating: 88,
        image: "Porzingis"
    },
    {
        id:9,
        name: "Stephen Curry",
        team: "Golden State Warriors",
        position: "Guard",
        stats: {
            fieldGoal: 47.5,
            assists: 6.2,
            rebounds: 5.3,
            steals: 1.4
        },
        rating: 98,
        image: "Curry"
    },
    {
        id:10,
        name: "Ja Morant",
        team: "Memphis Grizzlies",
        position: "Guard",
        stats: {
            fieldGoal: 44.3,
            assists: 7.6,
            rebounds: 3.3,
            steals: 1.0
        },
        rating: 95,
        image: "Morant"
    },
    {
        id:11,
        name: "De'Aaron Fox",
        team: "Sacramento Kings",
        position: "Guard",
        stats: {
            fieldGoal: 46.9,
            assists: 7.5,
            rebounds: 3.4,
            steals: 1.3
        },
        rating: 86,
        image: "Fox"
    },
    {
        id:12,
        name: "Al Horford",
        team: "Oklahoma City Thunder",
        position: "Center",
        stats: {
            fieldGoal: 44.7,
            assists: 3.3,
            rebounds: 6.7,
            steals: 0.9
        },
        rating: 85,
        image: "Horford"
    },
    {
        id:13,
        name: "Zion Williamson",
        team: "New Orleans Pelicans",
        position: "forward",
        stats: {
            fieldGoal: 61.8,
            assists: 3.5,
            rebounds: 7.0,
            steals: 0.9
        },
        rating: 92,
        image: "Williamson"
    },
    {
        id:14,
        name: "John Wall",
        team: "Houston Rockets",
        position: "Guard",
        stats: {
            fieldGoal: 42.5,
            assists: 6.1,
            rebounds: 3.2,
            steals: 0.8
        },
        rating: 89,
        image: "Wall"
    },
    {
        id:15,
        name: "D'Angelo Russell",
        team: "Minnesota Timberwolves",
        position: "Guard",
        stats: {
            fieldGoal: 42.6,
            assists: 5.1,
            rebounds: 2.6,
            steals: 1.1
        },
        rating: 90,
        image: "Russell"
    },
    {
        id:16,
        name: "Rudy Gobert",
        team: "Utah Jazz",
        position: "Center",
        stats: {
            fieldGoal: 64.1,
            assists: 1.3,
            rebounds: 13.5,
            steals: 0.5
        },
        rating: 94,
        image: "Gobert"
    },
    {
        id:17,
        name: "Lebron James",
        team: "Los Angeles Lakers",
        position: "Forward",
        stats: {
            fieldGoal: 51.3,
            assists: 8.0,
            rebounds: 8.1,
            steals: 1.1
        },
        rating: 99,
        image: "James"
    },
    {
        id:18,
        name: "Chris Paul",
        team: "Phoenix Suns",
        position: "Guard",
        stats: {
            fieldGoal: 48.7,
            assists: 8.7,
            rebounds: 8.7,
            steals: 1.4
        },
        rating: 92,
        image: "Paul"
    },
    {
        id:19,
        name: "Paul George",
        team: "Los Angeles Clippers",
        position: "Forward",
        stats: {
            fieldGoal: 48.4,
            assists: 5.3,
            rebounds: 6.1,
            steals: 1.1
        },
        rating: 90,
        image: "George"
    },
    {
        id:20,
        name: "Nikola Jokic",
        team: "Denver Nuggets",
        position: "Center",
        stats: {
            fieldGoal: 56.5,
            assists: 8.6,
            rebounds: 11.1,
            steals: 1.6
        },
        rating: 95,
        image: "Jokic"
    },
    {
        id:21,
        name: "Carmelo Anthony",
        team: "Portland Trail Blazers",
        position: "Forward",
        stats: {
            fieldGoal: 41.7,
            assists: 1.8,
            rebounds: 3.3,
            steals: 0.9
        },
        rating: 87,
        image: "Anthony"
    },
    {
        id:22,
        name: "DeMar DeRozan",
        team: "San Antonio Spurs",
        position: "Forward",
        stats: {
            fieldGoal: 49.3,
            assists: 7.3,
            rebounds: 4.6,
            steals: 0.9
        },
        rating: 89,
        image: "DeRozan"
    },
    {
        id:23,
        name: "Kelly Oubre Jr.",
        team: "Golden State Warriors",
        position: "Guard",
        stats: {
            fieldGoal: 43.7,
            assists: 1.3,
            rebounds: 5.8,
            steals: 1.1
        },
        rating: 86,
        image: "Oubre"
    },
    {
        id:24,
        name: "Lonzo Ball",
        team: "New Orleans Pelicans",
        position: "Guard",
        stats: {
            fieldGoal: 42.5,
            assists: 5.6,
            rebounds: 4.2,
            steals: 1.3
        },
        rating: 87,
        image: "Ball-Lonzo"
    },
    {
        id:25,
        name: "Joel Embiid",
        team: "Philadelphia 76ers",
        position: "Center",
        stats: {
            fieldGoal: 52.5,
            assists: 3.3,
            rebounds: 11.5,
            steals: 1.2
        },
        rating: 98,
        image: "Embiid"
    },
    {
        id:26,
        name: "Goran Dragic,",
        team: "Miami Heat",
        position: "Point Guard",
        stats: {
            fieldGoal: 43.6,
            assists: 4.9,
            rebounds: 3.3,
            steals: 0.6
        },
        rating: 78,
        image: "Dragic"
    },
    {
        id:27,
        name: "Alec Burks",
        team: "New York Knicks",
        position: "Shooting Guard",
        stats: {
            fieldGoal: 50,
            assists: 2.1,
            rebounds: 4.3,
            steals: 2
        },
        rating: 75,
        image: "Burks"
    },
    {
        id:28,
        name: "DeAndre Jordan",
        team: "Brooklyn Nets",
        position: "Center",
        stats: {
            fieldGoal: 76.7,
            assists: 5,
            rebounds: 7.5,
            steals: 2
        },
        rating: 82,
        image: "Jordan"
    },
    {
        id:29,
        name: "Trae Young",
        team: "Atlanta Hawks",
        position: "Point Guard",
        stats: {
            fieldGoal: 43.3,
            assists: 9.4,
            rebounds: 4.1,
            steals: 0.8
        },
        rating: 90,
        image: "Young"
    },
    {
        id:30,
        name: "Kevin Durant",
        team: "Brooklyn Nets",
        position: "Power Forward",
        stats: {
            fieldGoal: 48,
            assists: 4,
            rebounds: 7,
            steals: 0.9
        },
        rating: 97,
        image: "Durant"
    },
    {
        id:31,
        name: "Kelly Olynyk",
        team: "Miami Heat",
        position: "Power Forward",
        stats: {
            fieldGoal: 60,
            assists: 3,
            rebounds: 8,
            steals: 0.2
        },
        rating: 78,
        image: "Olynyk"
    },
    {
        id:32,
        name: "LaMelo Ball",
        team: "Charlotte Hornets",
        position: "Point Guard",
        stats: {
            fieldGoal: 50,
            assists: 8,
            rebounds: 4,
            steals: 1
        },
        rating: 85,
        image: "Ball"
    },
    {
        id:33,
        name: "Bradley Beal",
        team: "Washington Bullets",
        position: "forward",
        stats: {
            fieldGoal: 45,
            assists: 3,
            rebounds: 4,
            steals: 0.5
        },
        rating: 86,
        image: "Beal"
    },
    {
        id:34,
        name: "Jeremy Lamb",
        team: "Indiana Pacers",
        position: "Shooting Guard",
        stats: {
            fieldGoal: 45,
            assists: 3,
            rebounds: 2,
            steals: 0.1
        },
        rating: 79,
        image: "Lamb"
    },
    {
        id:35,
        name: "James Harden",
        team: "Brooklyn Nets",
        position: "Shooting Guard",
        stats: {
            fieldGoal: 55,
            assists: 6,
            rebounds: 4,
            steals: 1
        },
        rating: 98,
        image: "Harden"
    },
    {
        id:36,
        name: "Jimmy Butler",
        team: "Miami Heat",
        position: "Small Forward",
        stats: {
            fieldGoal: 48.1,
            assists: 7.5,
            rebounds: 7.5,
            steals: 2.1
        },
        rating: 93,
        image: "Butler"
    },
    {
        id:37,
        name: "Mason Plumlee",
        team: "Detroit Pistons",
        position: "Center",
        stats: {
            fieldGoal: 50,
            assists: 5,
            rebounds: 5,
            steals: 2
        },
        rating: 84,
        image: "Plumlee"
    },
    {
        id:38,
        name: "Brook Lopez",
        team: "Milwaukee Bucks",
        position: "Center",
        stats: {
            fieldGoal: 60.6,
            assists: 3.6,
            rebounds: 9.5,
            steals: 0.8
        },
        rating: 86,
        image: "Lopez"
    },
    {
        id:39,
        name: "Kemba Walker",
        team: "Boston Celtics",
        position: "Point Guard",
        stats: {
            fieldGoal: 38.8,
            assists: 4.6,
            rebounds: 3.5,
            steals: 1.0
        },
        rating: 88,
        image: "Walker"
    },
    {
        id:40,
        name: "Coby White",
        team: "Chicago Bulls",
        position: "Point Guard",
        stats: {
            fieldGoal: 41.4,
            assists: 4.8,
            rebounds: 4.7,
            steals: 0.5
        },
        rating: 84,
        image: "White"
    },
    {
        id:41,
        name: "Fred VanVleet",
        team: "Toronto Raptors",
        position: "Shooting Guard",
        stats: {
            fieldGoal: 40.0,
            assists: 9,
            rebounds: 6,
            steals: 2
        },
        rating: 85,
        image: "VanVleet"
    },
    {
        id:42,
        name: "Victor Oladipo",
        team: "Indiana Pacers",
        position: "Shooting Guard",
        stats: {
            fieldGoal: 40.5,
            assists: 4.7,
            rebounds: 5,
            steals: 1.3
        },
        rating: 88,
        image: "Oladipo"
    },
    {
        id:43,
        name: "Andre Iguodala",
        team: "Miami Heat",
        position: "Small Forward",
        stats: {
            fieldGoal: 38.6,
            assists: 2.1,
            rebounds: 3.7,
            steals: 1
        },
        rating: 82,
        image: "Iguodala"
    },
    {
        id:44,
        name: "De'Andre Hunter",
        team: "Atlanta Hawks",
        position: "Small Forward",
        stats: {
            fieldGoal: 51.4,
            assists: 2.2,
            rebounds: 5.4,
            steals: 0.9
        },
        rating: 78,
        image: "Hunter"
    },
    {
        id:45,
        name: "Yuta Watanabe",
        team: "Toronto Raptors",
        position: "Small Forward",
        stats: {
            fieldGoal: 31.3,
            assists: 0.5,
            rebounds: 3,
            steals: 0.4
        },
        rating: 73,
        image: "Watanabe"
    },
    {
        id:46,
        name: "Nikola Vucevic",
        team: "Orlando Magic",
        position: "Center",
        stats: {
            fieldGoal: 59.2,
            assists: 3.5,
            rebounds: 8,
            steals: 1.0
        },
        rating: 86,
        image: "Vucevic"
    },
    {
        id:47,
        name: "Tristan Thompson",
        team: "Boston Celtics",
        position: "Center",
        stats: {
            fieldGoal: 60.1,
            assists: 1.5,
            rebounds: 7.8,
            steals: 0.8
        },
        rating: 89,
        image: "Thompson"
    },
    {
        id:48,
        name: "Taj Gibson",
        team: "New York Knicks",
        position: "Center",
        stats: {
            fieldGoal: 50.1,
            assists: 0.8,
            rebounds: 5.6,
            steals: 1
        },
        rating: 84,
        image: "Gibson"
    },
    {
        id:49,
        name: "Giannis Antetokounmpo",
        team: "Milwaukee Bucks",
        position: "Power Forward",
        stats: {
            fieldGoal: 56.3,
            assists: 6.2,
            rebounds: 11.8,
            steals: 1.3
        },
        rating: 98,
        image: "Antetokounmpo"
    },
    {
        id:50,
        name: "Pascal Siakam",
        team: "Toronto Raptors",
        position: "Forward",
        stats: {
            fieldGoal: 44.7,
            assists: 4.8,
            rebounds: 7.3,
            steals: 1.1
        },
        rating: 90,
        image: "Siakam"
    }
]
export default mock;

