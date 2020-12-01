const state = {
    // analysis parameters
    parameters:{
        cpf:0.9,
        cbpf:0.9,
    },
    // ui control
    ui_control: {
        isLoading: false,
        map_loading: false,
        data_view: false,
        curr_tab: 0,
        new_case:
        {
            show: false,
            edit: -1,
            selection: {
                case_name: "New Case",
                site: [],
                chemical: [],
                // traj_job: [],
                year: [],
                month: ["Spring", "Summer", "Autumn", "Winter"],
                hour: [
                    "Morning rush hours (6:00-9:00)",
                    "Daytime hours (10:00-16:00)",
                    "Afternoon rush hours (15:00-20:00)",
                    "Night hours (21:00-5:00)",
                ],
            },
        },
        // selected case for display 9 figures
        thumb_fig_index:"",
        fig_view: { 
            show: false, 
            id: "", 
            selected_case_name:[],
            text:'',
        },
        snackbar: { show: true, text: 'Thanks for using TraPSA!', color: 'info' },
        mete_dialog: false,
        mete_required: { show: false, items: [] },
        dateformat: {
            show: false,
            text: [
                {}
            ]
        },

        // add PSCF
        new_source_layer:{
            show:false,
            eidt:-1, 
        }
    },
    // HYSPLIT parameters displayed in UI
    hysplit: {
        working: "C:\\Users\\zhouc\\Desktop\\python\\TraPSA\\HYSPLIT",
        sites: [],
        start_time: { isExpand: false, sample_period: null, expand_number: null },
        height_type: ["Height above ground", "Relative to mean sea level", "Fraction of the mixed layer"],
        start_height: { value_type: "Height above ground", value: 500 },
        trajectory_time: -24,
        mete: {
            type: "NCEP/NCAR",
            path: "C:\\Users\\zhouc\\Desktop\\python\\TraPSA\\data\\mete_data\\GBL"
        },
        mete_types: ["NCEP/NCAR", "GDAS1", "GDAS0p5", "EDAS40", "NARR"],
    },
    // curr_job is actually the last job.
    curr_job: {
        csv_file: "",
        job_name: "",
        start_point: [
            {
                timestamp: null,
                site_name: null,
                TimeString: null,
            }],
        trajectory_time: null,
        height: null,
        kmsl: null,
        working_folder: "",
        mete_folder: "",
        mete_type: ""
    },
    // define the missing data in the uploaded files
    missing_data: "",
    // define the site data used in the app
    sites: {
        header: [
            {
                text: "site_name",
                align: "start",
                value: "site_name",
            },
            {
                text: "lon",
                value: "lon",
            },
            {
                text: "lat",
                value: "lat",
            },

        ],
        data: [
        ],
    },
    // define the measurement data used in the app
    measurement: {
        header: [
            {
                text: "timestamp",
                value: "timestamp",
            },
            {
                text: "site_name",
                value: "site_name",
            },
            {
                text: "chemical_1",
                value: "chemical_1",
            },
            {
                text: "chemical_2",
                value: "chemical_2",
            },
            {
                text: "...",
            },
        ],
        data: [],
    },

    // define the wind data used in the app,{ID	timestamp	site_name	wind_speed	wind_direction}
    wind_data: {
        header: [
            {
                text: "timestamp",
                value: "timestamp",
            },
            {
                text: "site_name",
                value: "site_name",
            },
            {
                text: "wind_speed",
                value: "wind_speed",
            },
            {
                text: "wind_direction",
                value: "wind_direction",
            },

        ],
        data: [
        ],
    },
    // traj_data: [{
    //     job_name: "",
    //     data: [{
    //         site_name: "",
    //         timestamp: "", correspounding to measurement
    //         traj_date: "", 
    //         lat: [],
    //         lon: [],
    //         alt: [],
    //     }]
    // }]
    traj_data: [],
    traj_jobs: [],
    // site_summary: [{
    //     name: "",
    //     location: [lat, lon],
    //     chemicals.name={
    //         name: "",
    //         record: 0,
    //         missing: 0,
    //         stats: [mean, max, min]
    //     },
    //     wind: {
    //         record: 0,
    //         missing: 0,
    //     },
    //     traj: {
    //         num: 0,
    //         jobs: []
    //     }
    // }],
    site_summary: [],

    // selected study case
    // {
    //     name: "",
    //     chemical:"",
    //     site:"",
    //     selected:false,
    //     data: {
    //         measurement:[{TimeString:, selected_chemical}],
    //         wind:[{TimeString, wind_speed, wind_direction}],
    //     },
    //     selections:{},
    //     model:{
    //         type:'PSCF',
    //         c:0.8,
    //         grid:0.5,
    //         weight:[],
    //         values:[],
    //         traj:[],
    //         selected:fasle
    //     },
    //     expand:false
    // }
    case: [


    ],

    // map layers
    // selected with 1. case/select data, 2.trajectory job, 3. method
    // trajectory clusters
    // text/markers
    map_layers:[
        {
            name:'111'
        },
        {
            name:'222'
        },
        {
            name:'333'
        }
    ],
};

const getters = {

};

const actions = {

};

const mutations = {
    // open previous section, set all the parameters
    OPENSECTION: (state, res) => {
        for (var i in res) {
            state[i] = res[i]
        }

        // re-initilze new variables

    },
    // generate site summary
    SITESUMMARY: (state) => {
        var site_summary = []
        for (var i in state.sites.data) {
            // find out site_name
            var site_name = state.sites.data[i].site_name
            // do measurement
            var M = state.measurement.data.filter((x) => { return x.site_name == site_name })
            var prev = {}
            var header = Object.keys(M[0])
            var chemical_name = []
            for (var k in header) {
                var h = header[k]
                if (h.toLowerCase() != "id" && h.toLowerCase() != "timestamp" && h.toLowerCase() != "site_name" && h.toLowerCase() != "timestring") {
                    prev[h] = {
                        name: h,
                        record: null,
                        missing: null,
                        mean: 0,
                        max: -9999,
                        min: 9999
                    }
                    chemical_name.push(h)
                }
            }

            var chemicals = M.reduce(function (prev, current) {
                for (var k in chemical_name) {
                    var c = chemical_name[k]
                    var value = parseFloat(current[c])
                    if (!isNaN(value)) {
                        prev[c].record += 1
                        prev[c].mean += value
                        if (value > prev[c].max) {
                            prev[c].max = value
                        }
                        if (value < prev[c].min) {
                            prev[c].min = value
                        }
                    }
                    else {
                        prev[c].missing += 1
                    }
                }
                return prev
            }, prev)

            // console.log(chemicals)
            // console.log(chemicals["O3"])

            for (var cc in chemicals) {
                chemicals[cc].mean = chemicals[cc].mean / chemicals[cc].record
            }

            var wind = {
                record: 0,
                missing: 0,
            }
            var W = state.wind_data.data.filter((x) => { return x.site_name == site_name })
            wind = W.reduce(function (prev, current) {
                if (current["wind_speed"] != null && current["wind_direction"] != null) {
                    prev.record += 1
                }
                else {
                    prev.missing += 1
                }
                return prev
            }, wind)

            var traj = {
                num: 0,
                jobs: []
            }
            for (var t in state.traj_data) {
                var T = state.traj_data[t].data.filter((x) => { return x.site_name == site_name })
                if (T.length > 0) {
                    traj.num += 1
                    traj.jobs.push(state.traj_data[t].job_name)
                }
            }

            var item = {
                site_name: site_name,
                location: [state.sites.data[i].lat, state.sites.data[i].lon],
                chemicals: chemicals,
                wind: wind,
                traj: traj
            }
            site_summary.push(item)
        }
        // console.log("site_summary", site_summary)
        // console.log(site_summary[0].traj.jobs[0])

        state.site_summary = site_summary;
    },

    UPDATE_DATA: (state, res) => {
        state[res.name] = res.data;
    },

    MERGE_DATA: () => {

    }

};

export default {
    state,
    getters,
    actions,
    mutations
};