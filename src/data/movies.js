const tmdbImage = (path, size = 'w500') => `https://image.tmdb.org/t/p/${size}/${path}`

export const heroMovie = {
  title: 'Duty After School',
  description:
    'Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.',
  image: tmdbImage('5kMIZHO8OYOC08urACEFFqmFA4p.jpg', 'w1280'),
}

export const continueWatching = [
  {
    id: 'dont-look-up',
    title: "Don't Look Up",
    rating: '4.5',
    image: tmdbImage('nvxrQQspxmSblCYDtvDAbVFX8Jt.jpg', 'w780'),
  },
  {
    id: 'the-batman',
    title: 'The Batman',
    rating: '4.2',
    image: tmdbImage('rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg', 'w780'),
  },
  {
    id: 'blue-lock',
    title: 'Blue Lock',
    rating: '4.6',
    badge: 'Episode Baru',
    image: tmdbImage('seMRyWVwIVBWbC9xaMzDMZJ8fUH.jpg', 'w780'),
  },
  {
    id: 'otto',
    title: 'A Man Called Otto',
    rating: '4.4',
    image: tmdbImage('9ZznETDyfPWVugRiv0jfGrkRftw.jpg', 'w780'),
  },
  {
    id: 'avatar-way-of-water-landscape',
    title: 'Avatar',
    rating: '4.7',
    image: tmdbImage('s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg', 'w780'),
  },
  {
    id: 'guardians-landscape',
    title: 'Guardians',
    rating: '4.8',
    image: tmdbImage('5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg', 'w780'),
  },
  {
    id: 'little-mermaid-landscape',
    title: 'The Little Mermaid',
    rating: '4.0',
    image: tmdbImage('A7JQ7MIV5fkIxceI5hizRIe6DRJ.jpg', 'w780'),
  },
  {
    id: 'tomorrow-war-landscape',
    title: 'The Tomorrow War',
    rating: '4.3',
    image: tmdbImage('yizL4cEKsVvl17Wc1mGEIrQtM2F.jpg', 'w780'),
  },
  {
    id: 'quantumania-landscape',
    title: 'Quantumania',
    rating: '4.1',
    image: tmdbImage('m8JTwHFwX7I7JY5fPe4SjqejWag.jpg', 'w780'),
  },
  {
    id: 'sonic-landscape',
    title: 'Sonic 2',
    rating: '4.5',
    image: tmdbImage('egoyMDLqCxzjnSrWOz50uLlJWmD.jpg', 'w780'),
  },
  {
    id: 'fast-x-landscape',
    title: 'Fast X',
    rating: '4.2',
    image: tmdbImage('4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg', 'w780'),
  },
  {
    id: 'alice-landscape',
    title: 'Alice in Borderland',
    rating: '4.6',
    image: tmdbImage('QZaPkNUvhdcKONuO2fXuqtcQRo.jpg', 'w780'),
  },
]

export const topRatedMovies = [
  {
    id: 'suzume',
    title: 'Suzume',
    badge: 'Episode Baru',
    image: tmdbImage('vIeu8WysZrTSFb2uhPViKjX9EcC.jpg'),
  },
  {
    id: 'jurassic-world',
    title: 'Jurassic World',
    image: tmdbImage('rhr4y79GpxQF9IsfJItRXVaoGs4.jpg'),
  },
  {
    id: 'sonic',
    title: 'Sonic 2',
    image: tmdbImage('6DrHO1jr3qVrViUO6s6kFiAGM7.jpg'),
  },
  {
    id: 'all-of-us',
    title: 'All of Us Are Dead',
    badge: 'Episode Baru',
    image: tmdbImage('pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg'),
  },
  {
    id: 'big-hero',
    title: 'Big Hero',
    top: true,
    image: tmdbImage('2mxS4wUimwlLmI1xp6QW6NSU361.jpg'),
  },
  {
    id: 'dune',
    title: 'Dune',
    image: tmdbImage('d5NXSklXo0qyIYkgV94XAgMIckC.jpg'),
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    top: true,
    image: tmdbImage('gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
  },
  {
    id: 'spider-verse',
    title: 'Spider-Verse',
    badge: 'Episode Baru',
    image: tmdbImage('8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'),
  },
  {
    id: 'inception',
    title: 'Inception',
    image: tmdbImage('edv5CZvWj09upOsy2Y6IwDhK8bt.jpg'),
  },
  {
    id: 'joker',
    title: 'Joker',
    top: true,
    image: tmdbImage('udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'),
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    image: tmdbImage('8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'),
  },
  {
    id: 'barbie',
    title: 'Barbie',
    image: tmdbImage('iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg'),
  },
]

export const trendingMovies = [
  {
    id: 'tomorrow-war',
    title: 'The Tomorrow War',
    top: true,
    image: tmdbImage('34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg'),
  },
  {
    id: 'quantumania',
    title: 'Quantumania',
    top: true,
    image: tmdbImage('ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg'),
  },
  {
    id: 'guardians',
    title: 'Guardians',
    top: true,
    image: tmdbImage('r2J02Z2OpNTctfOSN1Ydgii51I3.jpg'),
  },
  {
    id: 'little-mermaid',
    title: 'The Little Mermaid',
    top: true,
    image: tmdbImage('ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg'),
  },
  {
    id: 'missing',
    title: 'Missing',
    top: true,
    image: tmdbImage('wEOUYSU5Uf8J7152PT6jdb5233Y.jpg'),
  },
  {
    id: 'john-wick-4',
    title: 'John Wick 4',
    top: true,
    image: tmdbImage('vZloFAK7NmvMGKE7VkF5UHaz0I.jpg'),
  },
  {
    id: 'black-panther',
    title: 'Black Panther',
    image: tmdbImage('sv1xJUazXeYqALzczSZ3O6nkH75.jpg'),
  },
  {
    id: 'dungeons-dragons',
    title: 'Dungeons & Dragons',
    badge: 'Episode Baru',
    image: tmdbImage('A7AoNT06aRAc4SV89Dwxj3EYAgC.jpg'),
  },
  {
    id: 'black-adam',
    title: 'Black Adam',
    image: tmdbImage('pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg'),
  },
  {
    id: 'shazam',
    title: 'Shazam',
    top: true,
    image: tmdbImage('2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg'),
  },
  {
    id: 'creed-iii',
    title: 'Creed III',
    image: tmdbImage('cvsXj3I9Q2iyyIo95AecSd1tad7.jpg'),
  },
  {
    id: 'mario',
    title: 'Super Mario Bros',
    image: tmdbImage('qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg'),
  },
]

export const newReleases = [
  {
    id: 'alice',
    title: 'Alice in Borderland',
    top: true,
    image: tmdbImage('Ac8ruycRXzgcsndTZFK6ouGA0FA.jpg'),
  },
  {
    id: 'aot',
    title: 'Attack on Titan',
    badge: 'Episode Baru',
    image: tmdbImage('hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg'),
  },
  {
    id: 'avatar',
    title: 'Avatar',
    top: true,
    image: tmdbImage('t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'),
  },
  {
    id: 'fast-x',
    title: 'Fast X',
    badge: 'Episode Baru',
    image: tmdbImage('fiVW06jE7z9YnO4trhaMEdclSiC.jpg'),
  },
  {
    id: 'missing-two',
    title: 'Missing',
    image: tmdbImage('gxRKsjkFJLgJtpEAf9ttnciJfg0.jpg'),
  },
  {
    id: 'transformers',
    title: 'Transformers',
    top: true,
    image: tmdbImage('gPbM0MK8CP8A174rmUwGsADNYKD.jpg'),
  },
  {
    id: 'elemental',
    title: 'Elemental',
    badge: 'Episode Baru',
    image: tmdbImage('4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg'),
  },
  {
    id: 'flash',
    title: 'The Flash',
    top: true,
    image: tmdbImage('rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg'),
  },
  {
    id: 'nun-ii',
    title: 'The Nun II',
    image: tmdbImage('5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg'),
  },
  {
    id: 'meg-2',
    title: 'Meg 2',
    top: true,
    image: tmdbImage('FQHtuf2zc8suMFE28RyvFt3FJN.jpg'),
  },
  {
    id: 'blue-beetle',
    title: 'Blue Beetle',
    badge: 'Episode Baru',
    image: tmdbImage('mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg'),
  },
  {
    id: 'hunger-games',
    title: 'The Hunger Games',
    image: tmdbImage('mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg'),
  },
]
