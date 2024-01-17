const db = require("../models");
const Quiz = db.quizzes;

//nambahin data ke dalam tabel quiz
exports.create = async (req,res) => {

  try {
    const data = await Quiz.create(req.body)
    res.json({
        message: "quiz created successfully.",
        data: data,
    })
  } catch (error) {
    res.status(500).json({
            message: error.message ,
            data: null,
          });
  }
}

//nampilin data
exports.getAll = async(req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            massage: "quiz retrieved successfully",
            data: quizzes,
        });
    }catch (error) {
        res.status(500).json({
            massage: error.massage,
            data: null,
        });
    }
};

//mengubah data
exports.update = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            massage: "quiz updated successfully",
            data: quiz,
        });
    }catch (error) {
        res.status(500).json({
            massage: error.massage || "some error ocurred while retrieving quiz",
            data: null,
        });
    }
};

//menghapus data
exports.delete = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        quiz.destroy()
        res.json({
            massage: "quiz deleted successfully"
        });
    }catch (error) {
        res.status(500).json({
            massage: error.massage || "some error ocurred while retrieving quiz",
            data: null,
        });
    }
};

//ambil data tertentu
exports.findOne = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            massage: `quizzes retrieved sucsessfully with id=${id}.`,
            data: quiz,
        });
    }catch (error) {
        res.status(500).json({
            massage: error.massage || "some error ocurred while retrieving quiz",
            data: null,
        });
    }
};

//menampilkan data berdasarkan kategori
exports.getByCategoryId = async(req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            categoryId: id
        }
    })
    res.json({
        massage: `Quizzes retivied succsesfully with categoryId=${id}.`,
        data: quizzes,
    });
};

//menampilkan data dengan level tertentu
exports.getByLevelId = async(req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            levelId: id
        }
    })
    res.json({
        massage: `Quizzes retivied succsesfully with levelId=${id}.`,
        data: quizzes,
    });
};