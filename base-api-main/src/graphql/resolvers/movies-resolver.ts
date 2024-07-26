import { Service } from 'typedi'
import { Query, Resolver } from 'type-graphql'
import { Movie } from '../../domain/models/Movie'
import { MoviesService } from '../../services/movies-service'

@Service()
@Resolver(Movie)
export class MoviesResolver {

  constructor(private moviesService: MoviesService) {
  }

  @Query(() => [ Movie ])
  async movies(): Promise<Movie[]> {
    return await this.moviesService.findAllMovies()
  }

}
