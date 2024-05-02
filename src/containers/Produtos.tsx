import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'

import * as S from './styles'

import { useSelector } from 'react-redux'
import { RootReducer } from '../store'
import { useGetProdutosQuery } from '../services/api'

const ProdutosComponent = () => {
  const favoritos = useSelector((state: RootReducer) => state.favorito.itens)
  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = favoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }
  const { data: produto, isLoading } = useGetProdutosQuery()
  if (isLoading) {
    return <h2>Carregando...</h2>
  }
  return (
    <>
      <S.Produtos>
        {produto?.map((p) => (
          <Produto
            produto={p}
            estaNosFavoritos={produtoEstaNosFavoritos(p)}
            key={p.id}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
