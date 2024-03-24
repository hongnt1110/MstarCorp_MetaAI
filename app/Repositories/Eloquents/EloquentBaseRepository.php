<?php

namespace App\Repositories\Eloquents;

use App\Contracts\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

class EloquentBaseRepository implements BaseRepository
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->all();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * @param $condition
     * @return mixed
     */
    public function getFirstQuery($condition)
    {
        return $this->model->where($condition)->first();
    }

    /**
     * @param $condition
     * @return mixed
     */
    public function getQuery($condition)
    {
        return $this->model->where($condition)->get();
    }

    /**
     * @param $field
     * @param $values
     * @return mixed
     */
    public function whereIn($field, $values)
    {
        return $this->model->whereIn($field, $values);
    }

    /**
     * @param $field
     * @param $values
     * @return mixed
     */
    public function getQueryIN($field, $values)
    {
        return $this->model->whereIn($field, $values)->get();
    }

    /**
     * @param $condition
     * @return mixed
     */
    public function getQueryNotIN($field, $values)
    {
        return $this->model->whereNotIn($field, $values)->get();
    }

    /**
     * Save a new entity in repository
     */
    public function create(array $input)
    {
        return $this->model->create($input);
    }

    /**
     * Update a entity in repository by id
     */
    public function update(array $input, $id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($input);

            return $result;
        }

        return false;
    }

    /**
     * @param $conditionUpdate
     * @param array $dataUpdate
     */
    public function updateWithWhere($paramQuery, $conditionUpdate, array $dataUpdate)
    {
        return $this->model->where($paramQuery, $conditionUpdate)->update($dataUpdate);
    }

    /**
     * Delete
     *
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();

            return true;
        }

        return false;
    }

    /**
     * @param $condition
     * @param array $array
     * @return mixed
     */
    public function createOrUpdate($condition, array $array, $lockType = null)
    {
        $result = $this->model;
        if ($lockType == 'lockForUpdate') {
            $result->lockForUpdate();
        }
        $result = $result->where($condition)->first();
        if ($result) {
            $result->update($array);

            return $result;
        } else {
            $insertArr = array_merge($condition, $array);

            return $this->model->create($insertArr);
        }
    }

    /**
     * @param $table
     * @param $primaryKey
     * @param $condition
     * @param $foreignKey
     * @return mixed
     */
    public function innerJoinTable($table, $primaryKey, $condition, $foreignKey)
    {
        return $this->model->join($table, $primaryKey, $condition, $foreignKey);
    }

    public function leftJoin($table, $primaryKey, $condition, $foreignKey)
    {
        return $this->model->leftJoin($table, $primaryKey, $condition, $foreignKey);
    }

    public function leftJoinSub($query, $as, $first, $operator = null, $second = null)
    {
        return $this->model->leftJoinSub($query, $as, $first, $operator, $second);
    }

    /**
     * @param array $array
     * @return mixed
     */
    public function insertWithArray(array $array)
    {
        return $this->model->insert($array);
    }

    public function queryCustom($condition)
    {
        return $this->model->where($condition);
    }

    public function paginate($limit)
    {
        return $this->model->paginate($limit);
    }

    /**
     * @return mixed
     */
    public function getModel()
    {
        return $this->model;
    }
}
