<?php

namespace App\Contracts\Repositories;

interface BaseRepository
{
    public function find($id);

    public function findOrFail($id);

    public function getAll();

    public function getFirstQuery($condition);

    public function getQuery($condition);

    public function create(array $input);

    public function update(array $input, $id);

    public function updateWithWhere($paramQuery, $conditionUpdate, array $dataUpdate);

    public function delete($id);

    public function getQueryNotIN($field, $values);

    public function whereIn($field, $values);

    public function getQueryIN($field, $values);

    public function createOrUpdate($condition, array $array);

    public function innerJoinTable($table, $primaryKey, $condition, $foreignKey);

    public function leftJoin($table, $primaryKey, $condition, $foreignKey);

    public function leftJoinSub($query, $as, $first, $operator = null, $second = null);

    public function insertWithArray(array $array);

    public function queryCustom($condition);

    public function paginate($limit);

    public function getModel();
}
