"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Students = use("App/Models/Student");

/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const students = await Students.all();
    return view.render("pages.students.index", { students: students.rows });
  }

  /**
   * Render a form to be used for creating a new student.
   * GET students/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render("pages.students.create");
  }

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, _, session }) {
    const student = new Students();

    student.nim = request.input("nim");
    student.name = request.input("name");
    student.birth_date = request.input("birth_date");
    student.religion = request.input("religion");
    student.majors = request.input("majors");

    await student.save();

    session.flash({ notification: "Berhasil ditambahkan" });
    return response.route("students.index");
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing student.
   * GET students/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const id = params.id;
    const student = await Students.find(id);

    return view.render("pages.students.edit", { student });
  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const id = params.id;
    const student = await Students.find(id);

    student.nim = request.input("nim");
    student.name = request.input("name");
    student.birth_date = request.input("birth_date");
    student.religion = request.input("religion");
    student.majors = request.input("majors");

    await student.save();

    session.flash({ notification: "Berhasil diperbarui" });
    return response.route("students.index");
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    const id = params.id;
    const student = await Students.find(id);

    await student.delete();

    session.flash({ notification: "Berhasil dihapus" });
    return response.route("students.index");
  }
}

module.exports = StudentController;
