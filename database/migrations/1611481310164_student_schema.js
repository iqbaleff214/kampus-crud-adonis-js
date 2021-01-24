"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StudentSchema extends Schema {
  up() {
    this.create("students", (table) => {
      table.increments();
      table.string("nim", 10).unique();
      table.string("name");
      table.date("birth_date");
      table.string("religion");
      table.string("majors");
      table.timestamps();
    });
  }

  down() {
    this.drop("students");
  }
}

module.exports = StudentSchema;
