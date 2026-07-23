import Product from '../Models/Product.js'

export const list = async (req, res) => {
    const { keyword = '', page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const query = keyword
        ? { name: { $regex: keyword, $options: 'i' } }
        : {};

    const products = await Product.find(query)
        .skip(skip)
        .limit(limitNum);

    res.json(products);
}

export const create = async (req, res) => {
    // allowlist: เลือกเฉพาะฟิลด์ที่ด์ที่อนุญาต
    const { name, detail, price } = req.body

    if (name === '' ) {
        return res.status(400).json({ message: 'Dont have name' });
    }

    const prod = await Product.create({ name, detail, price })
    res.status(201).json(prod)
}

export const read = async (req, res) => {
    const prod = await Product.findById(req.params.id)
    if (!prod)
        return res.status(404).json({ message: 'Not found' })
    res.json(prod)
}

export const update = async (req, res) => {
    const { name, detail, price } = req.body
    const updated = await Product.findByIdAndUpdate(
        req.params.id, { name, detail, price },
        { new: true, runValidators: true })
    if (!updated)
        return res.status(404).json({ message: 'Not found' })
    res.json(updated)
}

export const remove = async (req, res) => {
    const removed = await Product.findByIdAndDelete(req.params.id)
    if (!removed)
        return res.status(404).json({ message: 'Not found' })
    res.status(204).end()
}