/** @format */

import axios from 'axios';

export function getClasses() {
  const response = axios.get('http://localhost:9393/api/classes');
  return response;
}

export function getAliments() {
  const response = axios.get('http://localhost:9393/api/aliments');
  return response;
}

export function getClasse(className) {
  const response = axios.get(`http://localhost:9393/api/classes/${className}`);
  return response;
}

export function exploreIndividual(name) {
  const response = axios.get(`http://localhost:9393/api/explore/${name}`);
  return response;
}

export function searchTerm(term) {
  const response = axios.get(`http://localhost:9393/api/search/${term}`);
  return response;
}

export function describeClasse(classe) {
  const response = axios.get(`http://localhost:9393/api/describe/${classe}`);
  return response;
}

export function getStatistique() {
  const response = axios.get(`http://localhost:9393/api/stats`);
  return response;
}

export function login(data) {
  const response = axios.post(`http://localhost:9393/api/login`, {
    pseudo: data.pseudo,
    password: data.password,
  });
  return response;
}

export function addAlimentToStore(data) {
  const response = axios.post(`http://localhost:9393/api/aliments`, data);
  return response;
}

export function addPlatToStore(data) {
  const response = axios.post(`http://localhost:9393/api/plats`, data);
  return response;
}

export function metRecommendation(data) {
  const response = axios.post(`http://localhost:9393/api/plats/chef`, data);
  return response;
}

export function getMaladies(etat) {
  const response = axios.get(`http://localhost:9393/api/maladies/${etat}`);
  return response;
}

export function maladieRecommendation(data) {
  const response = axios.post(`http://localhost:9393/api/maladies`, data);
  return response;
}
