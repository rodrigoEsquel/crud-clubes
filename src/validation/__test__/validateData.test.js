/// <reference types="jest" />

import { jest } from '@jest/globals';
import db from '../../database/database.js';
import {
  validateAreaName, validateEmail, validateName, validateTla, validateWebsite,
} from '../validateData.js';

describe('Item validation from inputs', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Area Name validations', () => {
    test('England should pass', () => {
      const response = validateAreaName('England');

      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('England');
    });
    test('Argentina should not pass', () => {
      const response = validateAreaName('Argentina');

      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Area name should be England');
    });
    test('Empty array should not pass', () => {
      const response = validateAreaName('');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Area name should be England');
    });
    test('Undefined should not pass', () => {
      const response = validateAreaName();
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Area name should be England');
    });
  });
  describe('Email validations', () => {
    test('test@test.com should pass', () => {
      const response = validateEmail('test@test.com');
      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('test@test.com');
    });
    test('Missing domain should not pass', () => {
      const response = validateEmail('test@.com');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid Email');
    });
    test('Missing top-level domain should not pass', () => {
      const response = validateEmail('test@test');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid Email');
    });
    test('Missing user should not pass', () => {
      const response = validateEmail('@test.com');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid Email');
    });
  });
  describe('Team name validations', () => {
    test('"Test FC" should pass', () => {
      const response = validateName('Test FC');
      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('Test FC');
    });
    test('"Test" should not pass', () => {
      const response = validateName('Test');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Name should finish with " FC"');
    });
    test('"TestFC" should not pass', () => {
      const response = validateName('TestFC');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Name should finish with " FC"');
    });
    test('"test FC" should not pass', () => {
      const response = validateName('test FC');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Name should start with capital letter');
    });
  });
  describe('Team TLA test', () => {
    test('Non-existing TLA should pass', () => {
      const teamsMock = [{ name: 'team1', tla: 'AAB' }, { name: 'team2', tla: 'AAC' }];
      const readFileSpy = jest.spyOn(db, 'getTeams').mockImplementation(() => teamsMock);

      const response = validateTla('AAA');

      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('AAA');
    });
    test('Existing TLA should not pass', () => {
      const teamsMock = [{ name: 'team1', tla: 'AAB' }, { name: 'team2', tla: 'AAC' }];
      const readFileSpy = jest.spyOn(db, 'getTeams').mockImplementation(() => teamsMock);

      const response = validateTla('AAB');

      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('TLA must be unique');
    });
    test('Real db TLA, but not mocked should pass', () => {
      const teamsMock = [{ name: 'team1', tla: 'AAB' }, { name: 'team2', tla: 'AAC' }];
      const readFileSpy = jest.spyOn(db, 'getTeams').mockImplementation(() => teamsMock);

      const response = validateTla('ARS');

      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('ARS');
    });
    test('Long TLA should not pass', () => {
      const response = validateTla('AAAA');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('TLA should be 3 capital letters');
    });
  });
  describe('Team web name test', () => {
    test('Full address should pass', () => {
      const response = validateWebsite('www.testwebpage.com');
      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('www.testwebpage.com');
    });
    test('Missing domain should not pass', () => {
      const response = validateWebsite('http://testwebpage');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid website adress');
    });
  });
});
