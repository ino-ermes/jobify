import {BarChart as BarChartLib, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

function BarChart({data}) {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChartLib
                data={data}
                margin={{top: 50}}
            >
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey='count' fill='#2cb1bc' barSize={75} />
            </BarChartLib>
        </ResponsiveContainer>
    );
}

export default BarChart;