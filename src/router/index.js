import VueRouter from "vue-router";
import index from "@/views/app/index.vue"
import data from "@/views/data"
export default new VueRouter(
    {
        base: process.env.BASE_URL,
        routes:[
            {
                path:'/',
                component:index
            },
            {
                path: "/data",
                name: "data/",
                component: index
              },
              {
                path: "/data/:user",
                name: "data",
                component: data
              }
        ]
    }
)