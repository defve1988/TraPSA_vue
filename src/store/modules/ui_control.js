const state = {
    // current tab
    curr_tab: 0,
    // information dialogs
    mete_dialog: false,
    data_view: false,
    snackbar: {
        show: true,
        text: 'Thanks for using TraPSA!',
        color: 'info'
    },
    mete_required: {
        show: false,
        items: []
    },

    // card title bar style
    system_bar_class: "py-1 px-2 primary lighten-4",

    // assign imported columns
    column_import: [{
            name: "Imported Columns",
            cols: "3",
            var: []
        },
        {
            name: "Timestamp",
            cols: "3",
            var: []
            // var: ["timestamp"]
        },
        {
            name: "Site Name",
            cols: "3",
            var: []
            // var: ["site_name"]
        },
        {
            name: "Measurements",
            cols: "3",
            var: []
        },
        {
            name: "Wind Direction",
            cols: "3",
            var: []
            // var: ["wind_direction"]
        },
        {
            name: "Wind Speed",
            cols: "3",
            var: []
            // var: ["wind_speed"]
        },
    ],

    // functional dialogs
    column_select: {
        show: true
    },


    isLoading: false,
    map_loading: false,
    new_case: {
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
    thumb_fig_index: "",
    source_case_index: "",
    fig_view: {
        show: false,
        id: "",
        selected_case_name: [],
        text: '',
    },


    dateformat: {
        show: false,
        text: [{}]
    },

    // add PSCF
    new_source_layer: {
        show: false,
        eidt: -1,
    },
    // HYSPLIT parameters displayed in UI
    hysplit: {
        working: "C:\\Users\\zhouc\\Desktop\\GitHub\\TraPSA_vue_2\\data\\HYSPLIT",
        job_name: "new_job",
        sites: [],
        start_time: {
            isExpand: false,
            sample_period: null,
            expand_number: null
        },
        height_type: ["Height above ground", "Relative to mean sea level", "Fraction of the mixed layer"],
        start_height: {
            value_type: "Height above ground",
            value: 500
        },
        trajectory_time: -24,
        mete: {
            type: "NCEP/NCAR",
            path: "C:\\Users\\zhouc\\Desktop\\GitHub\\TraPSA_vue_2\\data\\GBL"
        },
        mete_types: ["NCEP/NCAR", "GDAS1", "GDAS0p5", "EDAS40", "NARR"],
    },
    // curr_job is actually the last job.

};

const getters = {

};

const actions = {

};

const mutations = {
    OPENSECTION_UI: (state, res) => {
        for (var i in res) {
            state[i] = res[i]
        }

    },

};

export default {
    state,
    getters,
    actions,
    mutations
};