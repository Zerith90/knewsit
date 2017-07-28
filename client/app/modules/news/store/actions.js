import Vue from "vue";
import {
    LOAD_NEWS,
    LOAD_SOURCE,
    UPDATE_CATEGORIES,
    LOADING
} from "./types";
import axios from 'axios';
import Service from "../../../core/service";
// import feed from 'rss-to-json'

let articles_endpoint = "https://newsapi.org/v1/articles",
    sources_endpoint = " https://newsapi.org/v1/sources",
    bam = "52c0080eb34146bf83d8b6762c1cd026"

export const initNews = function({
    commit,
    state,
    getters
}, category) {
    let source = null;
 
    if (!category) category = "general";
    if (!getters.loading) {
           commit(LOADING)
        try {
            console.log(Math.round(getters.feed.length / 10, 0), category,getters.feed)
            source = getters.categories[category][Math.round(getters.feed.length / 10, 0)].id;

            axios.get(`${articles_endpoint}?source=${source}&sortBy=top&apiKey=${bam}&limit=100`).then((res) => {
                commit(LOADING)
                commit(LOAD_NEWS, res.data.articles)
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    }
};

export const initSources = function({
    commit,
    state,
    getters
}) {
    commit(UPDATE_CATEGORIES, getters.sources.reduce((p, c) => {
        if (c.country == "us") {
            p[c.category] = p[c.category] || [];
            p[c.category].push(c)
        }

        return p;
    }, {}))

}

export const initStraitsTimes = function({
    commit,
    state,
    getters
}) {
    // feed.load('http://www.straitstimes.com/print/top-of-the-news/rss.xml', function(err, rss) {
    //     console.log(rss);
    // });
}