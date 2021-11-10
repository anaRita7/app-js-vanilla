package com.controle_despesa.model.dto;

import com.controle_despesa.model.entity.Categoria;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CategoriaDTO {
    private String descricao;

    public CategoriaDTO(Categoria categoria){
        this.descricao = categoria.getDescricao();
    }

    public static List<CategoriaDTO> converter(List<Categoria> categorias) {
        return categorias.stream().map(CategoriaDTO::new).collect(Collectors.toList());
    }
}
