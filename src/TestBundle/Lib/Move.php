<?php

namespace TestBundle\Lib;


class Move {

    /** @var  string */
    private $name;
    /** @var  string */
    private $hierarchy;
    /**@var array */
    private $data = array();
    /** @var  array */
    private static $HIERARCHY_MOVE = array(
        'Royal flush'    => 100,
        'Straight flush' => 90,
        'Four of a kind' => 80,
        'Full house'     => 70,
        'Flush'          => 60,
        'Straight'       => 50,
        'Three'          => 40,
        'Two pairs'      => 30,
        'Pair'           => 20,
        'High card'      => 10

    );

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
        foreach(self::$HIERARCHY_MOVE as $key=>$value) {
            if($name == $key)
                $this->setHierarchy($value);
        }
    }

    /**
     * @return mixed
     */
    public function getHierarchy()
    {
        return $this->hierarchy;
    }

    /**
     * @param mixed $hierarchy
     */
    public function setHierarchy($hierarchy)
    {
        $this->hierarchy = $hierarchy;
    }

    /**
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param array $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }


    public function toArray()
    {
        return array(
            'name'      => $this->name,
            'hierarchy' => $this->hierarchy,
            'data'      => $this->data ? $this->data : null
        );
    }



}