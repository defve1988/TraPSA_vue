
import fig_props from "./src/fig_props"
import obj_props from "./src/obj_props"

export default class {
    constructor(name) {
        if (name != "") {
            this.init_obj(name)
        }
    }

    init_obj(name) {
        this.obj = this.init_props(fig_props[name])
    }

    init_props(obj) {
        var props_detail = {}
        obj.props.forEach(prop => {
            // make sure deep copy
            let curr_obj = JSON.parse(JSON.stringify(obj_props[prop]))
            if (curr_obj.props == null) {
                props_detail[prop] = curr_obj
            }
            else {
                props_detail[prop] = this.init_props(curr_obj)
            }
        })
        obj.props_detail = props_detail
        return obj
    }

    set_title(title) {
        // console.log(title, this.obj.props_detail)
        this.obj.props_detail.title.props_detail.text.props_detail.value = "New " + title
    }

    get_values() {
        this.values = this.gen_values(this.obj.props_detail)
        console.log(JSON.stringify(this.values, undefined, 4))
    }

    gen_values(props_detail) {
        var res_value = {}
        for (const [, value] of Object.entries(props_detail)) {
            if (value.props == null) {
                res_value[value.attr_name] = value.props_detail.value
            }
            else {
                if (value.attr_name == "color") {
                    res_value[value.attr_name] = this.hex2rgba(this.gen_values(value.props_detail))
                }
                else if (value.attr_name == "fig_margin") {
                    res_value["margin"] = this.gen_values(value.props_detail).margin
                }
                else {
                    res_value[value.attr_name] = this.gen_values(value.props_detail)
                }
            }
        }
        return res_value
    }

    hex2rgba(color_obj) {
        var hex = color_obj.hex_color
        var alpha = color_obj.opacity
        // convert hex color to rgba
        hex = hex.substring(1,)
        if (hex.length === 3) {
            hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${alpha})`;
    }
}