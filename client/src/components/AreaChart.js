import {AreaChart as AreaChartLib, ResponsiveContainer, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

function AreaChart({data}) {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaChartLib data={data} margin={{top: 50}}>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false}/>
                <Area dataKey='count' type='monotone' stroke='#2cb1bc' fill='#bef8fd'/>
                <Tooltip />
                <CartesianGrid strokeDasharray='3 3'/>
            </AreaChartLib>
        </ResponsiveContainer>
    );
}

export default AreaChart;