import {Plugin} from "chart.js";

/**
 * {@link https://www.chartjs.org/docs/latest/developers/plugins.html}
 */
export default {
    id: 'horizontalLine',
    defaults: {
        mouseTrackerData: {
            x: 0,
            y: 0,
        },
        isWithinChart: false,
    },
    afterEvent(chart, args) {
        this.defaults.isWithinChart = args.inChartArea;
        if (!this.defaults.isWithinChart) {
            return;
        }

        this.defaults.mouseTrackerData = {x: args.event.x, y: args.event.y};
        chart.draw();
    },
    afterDatasetsDraw(chart, args, options) {
        if (!this.defaults.isWithinChart) {
            return;
        }

        // Calculate the numeric value from the pixel height
        const dataValue = chart.scales.y.getValueForPixel(this.defaults.mouseTrackerData.y).toFixed(1);
        chart.ctx.save();

        // Draw the Horizontal Line
        chart.ctx.beginPath();
        chart.ctx.moveTo(chart.chartArea.left, this.defaults.mouseTrackerData.y);
        chart.ctx.lineTo(chart.chartArea.right, this.defaults.mouseTrackerData.y);
        chart.ctx.lineWidth = 1;
        chart.ctx.strokeStyle = options.lineColor;
        chart.ctx.setLineDash([4, 4]);
        chart.ctx.stroke();

        // Draw the Y-Value Label Badge
        const textWidth = chart.ctx.measureText(dataValue).width;
        const paddingX = 12;
        const badgeWidth = textWidth + paddingX;
        const badgeHeight = 22;

        // Positions the badge over the Y-axis boundary line
        const badgeX = chart.chartArea.left - badgeWidth;
        const badgeY = this.defaults.mouseTrackerData.y - (badgeHeight / 2);

        // Draw background block for the text
        chart.ctx.fillStyle = options.labelBoxBgColor;
        chart.ctx.beginPath();
        chart.ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 3);
        chart.ctx.fill();

        // Draw white text inside the block
        chart.ctx.fillStyle = 'white';
        chart.ctx.textAlign = 'center';
        chart.ctx.textBaseline = 'middle';
        chart.ctx.fillText(dataValue, badgeX + (badgeWidth / 2), this.defaults.mouseTrackerData.y);

        chart.ctx.restore();
    }
} as Plugin;
