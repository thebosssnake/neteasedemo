import {useStore,mapMutations} from "vuex";
import {reactive, computed} from "vue";

export {
    useMapMutations
}
function useMapMutations () {
    const store = useStore()
    if (arguments.length === 1) {
        let mapper = arguments[0]
        if (typeof mapper === "string" && mapper.length > 0) {
            return param =>{
                store.commit(mapper, param)
            }
        }
        if (mapper instanceof Array && mapper.length > 0) {
            let mappers = reactive({})
            mapper.forEach(item => {
                mappers[item] = mapMutations(item)
            })
            return mappers
        }
    }
    if (arguments.length === 2) {
        const moduleName = arguments[0]
        const mapper = arguments[1]
        if (typeof moduleName !== "string") {
            console.error("传入的moduleName类型或格式错误！")
            return null
        }
        if (typeof mapper === "string" && mapper.length > 0) {
            let mapperName = moduleName + "/" + mapper
            return mapMutations(mapperName)
        }
        if (mapper instanceof Array && mapper.length > 0) {
            let mappers = reactive({})
            mapper.forEach(item => {
                mappers[item] = mapMutations(moduleName, item)
            })
            return mappers
        }
    }
    console.error("使用方法有误，请检查输入参数的格式！")
    return null
}