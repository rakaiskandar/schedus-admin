export default function mapToArray(data) {
    const mapped = data.map(d => {
        return { id: d.id, ...d.data() }
    })
    return mapped
}