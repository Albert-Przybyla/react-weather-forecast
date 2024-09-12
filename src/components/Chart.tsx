import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useForecastContext } from "@/contexts/forecastContext";

export const Chart = () => {
  const chartConfig = {
    temp: {
      label: "Temperature",
    },
    feels_like: {
      label: "Perceived temp",
    },
  } satisfies ChartConfig;

  const { forecastData } = useForecastContext();

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={
          forecastData?.list.map((x) => {
            const d = new Date(x.dt_txt).toString().split(" ");
            return {
              temp: x.main.temp,
              feels_like: x.main.feels_like,
              label: d[0] + " " + d[4].substring(0, 5),
            };
          }) ?? []
        }
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Area dataKey="temp" type="natural" fillOpacity={0.4} stroke="blue" fill="blue" stackId="a" />
        <Area dataKey="feels_like" type="natural" fillOpacity={0.4} stroke="red" fill="red" stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
};
