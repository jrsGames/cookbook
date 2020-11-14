import { LatLngTuple } from 'leaflet';
import { infoText } from './infoTexts';

const PRIVATE = "privat";

export interface Stop {
	name: string,
	distanceToNext: number,
	height: number,
	inhabitants: string,
	infoText: string,
	pic: string,
	source?: string
}

export interface MapsView {
	defaultLatLng: LatLngTuple,
	zoom: number
}

export interface Tour {
	name: string,
	stops: Stop[],
	mapsView: MapsView,
	pic: string,
	source?: string
}

const tour1: Tour = {
	name: 'Altmuehltal',
	stops: [
		{name: 'Gunzenhausen', height: 413, distanceToNext: 27, infoText: infoText.Gunzenhausen, inhabitants: "16.600", pic: "1fe104fc.jpg",
		source: "https://www.naturpark-altmuehltal.de/orte/gunzenhausen/"},
		{name: 'Treuchtlingen', height: 410, distanceToNext: 8, infoText: infoText.Treuchtlingen, inhabitants: "12.900", pic: "2533055d.jpg",
		source: "https://www.naturpark-altmuehltal.de/orte/treuchtlingen/"},
		{name: 'Pappenheim', height: 405, distanceToNext: 7, infoText: infoText.Pappenheim, inhabitants: "4.000", pic: "15b50408.jpg", source: "https://www.naturpark-altmuehltal.de/orte/pappenheim/"},
		{name: 'Solnhofen', height: 405, distanceToNext: 12, infoText: infoText.Solnhofen, inhabitants: "1.800", pic: "122203ad.jpg",
		source: "https://www.naturpark-altmuehltal.de/sehenswertes/sola-basilika-647/"},
		{name: 'Dollnstein', height: 395, distanceToNext: 16, infoText: infoText.Dollnstein, inhabitants: "2.900", pic: "15ff041d.jpg", source: "https://www.naturpark-altmuehltal.de/orte/dollnstein/"},
		{name: 'Eichstaett', height: 389, distanceToNext: 31, infoText: infoText.Eichstaett, inhabitants: "13.500", pic: "17a704b0.jpg",
		source: "https://www.naturpark-altmuehltal.de/sehenswertes/willibaldsburg-bis_auf_weitere-1761/"},
		{name: 'Kipfenberg', height: 377, distanceToNext: 8.5, infoText: infoText.Kipfenberg, inhabitants: "5.800", pic: "157903fe.jpg", source: "https://www.naturpark-altmuehltal.de/orte/kipfenberg/"},
		{name: 'Kinding', height: 373, distanceToNext: 10.5, infoText: infoText.Kinding, inhabitants: "2.500", pic: "0abe02c5.jpg", source: "https://www.naturpark-altmuehltal.de/orte/kinding/"},
		{name: 'Beilngries', height: 368, distanceToNext: 11.5, infoText: infoText.Beilngries, inhabitants: "9.800", pic: "153e0405.jpg", source: "https://www.naturpark-altmuehltal.de/orte/beilngries/"},
		{name: 'Dietfurt a.d. Altmuehl', height: 364, distanceToNext: 21.5, infoText: infoText.Dietfurt, inhabitants: "6.100", pic: "0df80348.jpg",
		source: "http://media-cdn.tripadvisor.com/media/photo-s/06/7c/59/30/vis-a-vis-dietfurt.jpg"},
		{name: 'Riedenburg', height: 351, distanceToNext: 22, infoText: infoText.Riedenburg, inhabitants: "6.000", pic: "15890408.jpg",
		source: "http://www.deutschland-luftaufnahmen.de/wp-content/uploads/2016/03/Riedenburg-2.jpg"},
		{name: 'Kelheim', height: 343, distanceToNext: 0, infoText: infoText.KelheimA, inhabitants: "16.700", pic: "0a9c02c0.jpg", source: "https://www.kelheim.de/wege/kelheim-bad_abbach-1898/"}
	],
	mapsView: {
		defaultLatLng: [49, 11.4],
		zoom: 8
	},
	pic: "082d026a.jpg",
	source: "http://www.velotouring.de/altmuehl/img/Essing-Tatzlwurm-01_768.jpg"
}

const tour2: Tour = {
	name: 'Ostbayerische Donau',
	stops: [
		{name: 'Kelheim', height: 343, distanceToNext: 18, infoText:  infoText.KelheimB, inhabitants: "16.700", pic: "0a9c02c0.jpg",source: "https://www.kelheim.de/wege/kelheim-bad_abbach-1898/"},
		{name: 'Bad Abbach', height: 337, distanceToNext: 22, infoText: infoText.Abbach, inhabitants: "12.300", pic: "074f0232.jpg",
		source: "https://upload.wikimedia.org/wikipedia/commons/f/f0/St._Christophorus_Bad_Abbach_03.jpg"},
		{name: 'Regensburg', height: 333, distanceToNext: 8, infoText: infoText.Regensburg, inhabitants: "152.600", pic: "15cb0415.jpg",
		source: "https://tourismus.regensburg.de/fileadmin/_processed_/a/1/csm_H_Altstadt_b23ef0c432.jpg"},
		{name: 'Donaustauf', height: 330, distanceToNext: 16, infoText: infoText.Donaustauf, inhabitants: "4.100", pic: "15f0041b.jpg",
		source: "https://oliverbetz.de/cms/files/Fliegen/Luftbilder-Bayern/Walhalla_2092.jpg"},
		{name: 'Woerth a.d. Donau', height: 322, distanceToNext: 26, infoText: infoText.Woerth, inhabitants: "4.900", pic: "0b5d031f.jpg",
		source: "https://upload.wikimedia.org/wikipedia/commons/0/02/Schloss_W%C3%B6rth.jpg"},
		{name: 'Straubing', height: 330, distanceToNext: 12, infoText: infoText.Straubing, inhabitants: "47.800", pic: "124703b0.jpg",
		source: "https://reisezieledeutschland.de/wp-content/uploads/2018/03/Donau-und-Herzogschloss-03-%C2%A9-Foto-Bernhard.jpg"},
		{name: 'Bogen', height: 318, distanceToNext: 24, infoText: infoText.Bogen, inhabitants: "10.300", pic: "057801ec.jpg",
		source: "https://db-service.toubiz.de/var/plain_site/storage/images/orte/bogen/wallfahrtskirche-auf-dem-bogenberg/donau/3238251-1-ger-DE/Donau_front_large.jpg"},
		{name: 'Metten', height: 313, distanceToNext: 4, infoText: infoText.Metten, inhabitants: "4.200", pic: "0831026e.jpg",
		source: "https://cdnwww.pnp.de/Nahezu/Wuerde/Buecher/Umfeld/Barockbibliothek/1861883/_/"+
		"1xsmkQhJ9LsqMtRrbh9JPvxsgQMgINDQRxx4ElB0N00WP2Nq1cTGo5RIQ4WZengTtU12polkyJ4vJSIHWzLCjDWkDPSfT6YoA8rli5AzFzFwc/160706-1715-29-54504211-klmetten-biblio-04.jpg"},
		{name: 'Deggendorf', height: 313, distanceToNext: 37, infoText: infoText.Deggendorf, inhabitants: "37.000", pic: "14f303f6.jpg",
		source: "https://www.bavaria.by/wp-content/uploads/2017/01/c-stadt-deggendorf-panor.jpg"},
		{name: 'Vilshofen a.d. Donau', height: 307, distanceToNext: 23, infoText: infoText.Vilshofen, inhabitants: "16.700", pic: "122b03af.jpg",
		source: "https://www.vilshofen.de/images/ueberuns/ortsteile/Vilshofen-heute_1.jpg"},
		{name: 'Passau', height: 293, distanceToNext: 0, infoText: infoText.Passau, inhabitants: "52.500", pic: "0827026e.jpg",
		source: "https://live.staticflickr.com/8107/8478536432_32692c5111_b.jpg"}
	],
	mapsView: {
		defaultLatLng: [48.8, 12.6],
		zoom: 8
	},
	pic: "059601f8.jpg",
	source: "https://upload.wikimedia.org/wikipedia/commons/5/58/Passau_Altstadt_Panorama_5.jpg"
}

const tour3: Tour = {
	name: 'Bodensee',
	stops: [
		{name: 'Lindau ', height: 396, distanceToNext: 11, infoText: infoText.LindauA, inhabitants: "25.500", pic: "07f6025e.JPG", source: PRIVATE},
		{name: 'Bregenz', height: 396, distanceToNext: 19, infoText: infoText.Bregenz, inhabitants: "29.700", pic: "0a9b02ce.jpg",
		source: "https://www.austria-direct-weddings.co.uk/assets/images/destinations/bregenz/Bregenz3.jpg"},
		{name: 'Grenze Rheineck', height: 398, distanceToNext: 10.5, infoText: infoText.Rheineck, inhabitants: "3.400", pic: "0df3032a.JPG", source: PRIVATE},
		{name: 'Rorschach', height: 399, distanceToNext: 15.5, infoText: infoText.Rorschach, inhabitants: "9.400", pic: "1213039e.JPG", source: PRIVATE},
		{name: 'Romanshorn', height: 401, distanceToNext: 20, infoText: infoText.Romanshorn, inhabitants: "11.200", pic: "16460428.jpg",
		source: "http://www.bodenseefotografie.de/wp-content/uploads/2015/12/2235_KB_Q-1300x867.jpg"},
		{name: 'Konstanz', height: 398, distanceToNext: 4.5, infoText: infoText.Konstanz, inhabitants: "84.800", pic: "1210038b.jpg",
		source: "https://www.bodensee.eu/imagebilder/konstanz_mende.jpg"},
		{name: 'Konstanz-Anlegestelle', height: 398, distanceToNext: 4.5, infoText: infoText.Anlegestelle, inhabitants: "84.800", pic: "1e9d04d6.jpg",
		source: "http://img.fotocommunity.com/konstanz-am-bodensee-faehrehafen-in-staad-luftbild-2009-a6942cf2-99c2-4523-b091-0fa87b6561b0.jpg?height=400"},
		{name: 'Meersburg', height: 398, distanceToNext: 18, infoText: infoText.Meersburg, inhabitants: "5.900", pic: "11c603ad.jpg",
		source: "https://fthmb.tqn.com/n9uj6ghpVgHqIf5e2V0OXfpg64k=/1280x854/filters:fill%28auto,1%29/488631491-56a3a3a05f9b58b7d0d2f72c.jpg"},
		{name: 'Friedrichshafen', height: 397, distanceToNext: 27, infoText: infoText.Friedrichshafen, inhabitants: "60.900", pic: "2f7f0606.JPG", source: PRIVATE},
		{name: 'Lindau', height: 396, distanceToNext: 0, infoText: infoText.LindauB, inhabitants: "25.500", pic: "07f6025e.JPG", source: PRIVATE}
	],
	mapsView: {
		defaultLatLng: [47.6, 9.4],
		zoom: 8
	},
	pic: "0db20326.JPG",
	source: "privat"
};

const tour4: Tour = {
	name: 'Chiemsee (in Planung)',
	stops: [],
	mapsView: {
		defaultLatLng: [47.6, 9.4],
		zoom: 8
	},
	pic: "0da30324.jpg",
	source: "https://www.ferienzentrale.com/wp-content/uploads/2017/06/dpa-urn-newsml-dpa-com-20090101-170615-99-857456_large_4_3.jpg"
};

export const TOURS: Tour[] = [tour1, tour2, tour3, tour4];