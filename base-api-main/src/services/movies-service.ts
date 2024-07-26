import { Service } from 'typedi'
import { Movie } from '../domain/models/Movie'

@Service()
export class MoviesService {

  constructor() {
  }

  async findAllMovies(): Promise<Movie[]> {
    return await Movie.findAll()
  }

}
