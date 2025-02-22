import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = () => {
    if (browser) {
        // start posthog
        posthog.init("phc_IfzgY5InWAzyNitx7KHj6iUaczwEG1ux1KrhBXi5Yjt", {
            api_host: "https://proxy.flessner.dev/posthog",
            ui_host: "https://eu.posthog.com",
            person_profiles: "always",
            capture_pageview: false,
            capture_pageleave: false
        });
    }
}
