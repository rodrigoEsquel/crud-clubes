/// <reference types="jest" />

import { jest } from '@jest/globals';
import fs from 'fs';
import db from '../database.js';

describe('Database functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Get Teams test', () => {
    test('Function should get teams from database', () => {
      const readFileSpy = jest.spyOn(fs, 'readFileSync');
      db.getTeams();
      expect(readFileSpy).toHaveBeenCalled();
    });
  });
  describe('Edit crest name test', () => {
    test('Should rename file in public folder with passed parameters', () => {
      const renameSpy = jest.spyOn(fs, 'renameSync').mockImplementation(() => {});
      db.editCrestName('AAA', '.jpg');
      expect(renameSpy).toHaveBeenCalledWith('./public/img/_newCrest', './public/img/AAA.jpg');
    });
  });
  describe('Delete crest test', () => {
    test('Should delete file in public folder with passed parameters', () => {
      const deleteSpy = jest.spyOn(fs, 'unlink').mockImplementation(() => {});

      db.deleteCrest('AAA', '.jpg');

      expect(deleteSpy).toHaveBeenCalledWith('./public/img/AAA.jpg');
    });
  });
  describe('Get team by TLA test', () => {
    test('Existing tla should get the team', () => {
      const teamsMock = [{ name: 'team1', tla: 'AAB' }, { name: 'team2', tla: 'AAC' }];
      const readFileSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(teamsMock));

      const team = db.getTeamByTla('AAB');

      expect(JSON.stringify(team)).toMatch('team1');
    });
    test('Missing tla should return false', () => {
      const teamsMock = [{ name: 'team1', tla: 'AAB' }, { name: 'team2', tla: 'AAC' }];
      const readFileSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(teamsMock));

      const team = db.getTeamByTla('AAA');

      expect(JSON.stringify(team)).toMatch('false');
    });
  });
    });
  });
});
