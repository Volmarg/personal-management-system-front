import {Component} from "vue";

export type RightSidebarComponentData = {
    componentName      ?: string | null,
    componentInstance  ?: Component | null,
    componentPropsData ?: Record<string, unknown>
}